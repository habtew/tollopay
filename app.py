from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS 
import logging
app = Flask(__name__)
CORS(app)

logging.getLogger('flask_cors').level = logging.DEBUG
logging.basicConfig(level=logging.INFO)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{os.environ['DB_USERNAME']}:{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"


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


# Enable CORS for all routes
@app.after_request
def after_request(response):
    #response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response


@app.route('/')
def hello():
    return 'Hello, world! This is a test route.'

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    print("op")
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')
    print(data)
    print("po")

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 400

    # Create a new user record
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

    # Retrieve user from database
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Verify password
    if not user.check_password(password):
        return jsonify({'error': 'Incorrect password'}), 401

    
    return jsonify({'message': 'Login successful', 'access_token': user.email})



@app.route('/balance', methods=['POST'])
def balance():
    
    print("h")
    data = request.json
    email = data.get('email')
    print(data)

    # Retrieve user from database
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Return user's balance
    return jsonify({'email': user.email, 'balance': user.balance})


@app.route('/send-money', methods=['POST'])
def send_money():
    data = request.json
    sender_email = data.get('sender_email')
    recipient_email = data.get('recipient_email')
    amount = data.get('amount')

    # Retrieve sender and recipient from the database
    sender = User.query.filter_by(email=sender_email).first()
    recipient = User.query.filter_by(email=recipient_email).first()

    if not sender:
        return jsonify({'error': 'Sender not found'}), 404
    if not recipient:
        return jsonify({'error': 'Recipient not found'}), 404

    # Check if sender has sufficient balance
    if sender.balance < amount:
        return jsonify({'error': 'Insufficient balance to send money'}), 400

    # Update sender and recipient balances
    sender.balance -= amount
    recipient.balance += amount
    db.session.commit()

    return jsonify({'message': f'Successfully sent {amount} to {recipient_email}'})



if __name__ == '__main__':
    app.run(debug=True)



