from flask import Flask, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS 
from flask import make_response
import logging
from datetime import datetime

app = Flask(__name__)
from flask_cors import CORS

cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.secret_key = "secret_key" 
logging.getLogger('flask_cors').level = logging.DEBUG
logging.basicConfig(level=logging.INFO)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{os.environ['DB_USERNAME']}:{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"


app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True



app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    password_hash = db.Column(db.String(250), nullable=False)
    balance = db.Column(db.Float, default=0.0)  

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<user %r>' % self.email

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_email = db.Column(db.String(120), nullable=False)
    recipient_email = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<TransactionHistory sender_email='{self.sender_email}' recipient_email='{self.recipient_email}' amount={self.amount} timestamp={self.timestamp}>"




@app.route('/')
def hello():
    return 'Hello, world! This is a test route.'

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    if not all([first_name, last_name, email, phone_number, password]):
        return jsonify({'error': 'All fields are required'}), 400
        
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 400

    new_user = User(first_name=first_name, last_name=last_name, email=email, phone_number=phone_number,balance=0)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User signed up successfully'})


# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not user.check_password(password):
        return jsonify({'error': 'Incorrect password'}), 401

    session['email'] = user.email
    print(session)

    response = make_response(jsonify({'message': 'Login successful', 'access_token': user.email, 'first_name': user.first_name}))

    return response

@app.route('/balance', methods=['GET'])
def balance():
    email = session.get('email')
    if not email:
        return jsonify({'error': 'No session found. Please login to check balance'}), 401

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'email': user.email, 'balance': user.balance})


@app.route('/send-money', methods=['POST'])
def send_money():
    email = session.get('email')

    if not email:
        return jsonify({'error': 'No session found. Please login to send money'}), 401

    data = request.json
    sender_email = email  
    recipient_email = data.get('recipient_email')
    amount = int(data.get('amount'))

    sender = User.query.filter_by(email=sender_email).first()
    recipient = User.query.filter_by(email=recipient_email).first()

    if not sender:
        return jsonify({'error': 'Sender not found'}), 404
    if not recipient:
        return jsonify({'error': 'Recipient not found'}), 404

    if sender.balance < amount:
        return jsonify({'error': 'Insufficient balance to send money'}), 400

    sender.balance -= amount
    recipient.balance += amount
    db.session.commit()

    # Record the transaction
    transaction = Transaction(sender_email=sender_email, recipient_email=recipient_email, amount=amount, timestamp=datetime.utcnow())
    db.session.add(transaction)
    db.session.commit()

    return jsonify({'message': f'Successfully sent {amount} to {recipient_email}'})

@app.route('/transaction-history', methods=['GET'])
def transaction_history():
    email = session.get('email')

    if not email:
        return jsonify({'error': 'No session found. Please login to view transaction history'}), 401

    transactions = Transaction.query.filter((Transaction.sender_email == email) | (Transaction.recipient_email == email)).all()

    # Serialize transactions to JSON
    transaction_data = []
    for transaction in transactions:
        if transaction.sender_email == email:
            amount = -transaction.amount  
        else:
            amount = transaction.amount
        transaction_data.append({
            'sender_email': transaction.sender_email,
            'recipient_email': transaction.recipient_email,
            'amount': amount,
            'timestamp': transaction.timestamp
        })

    return jsonify(transaction_data)

@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout successful'})


if __name__ == '__main__':
    app.run(debug=True)
