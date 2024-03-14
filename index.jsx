import React from 'react';
import ReactDOM from 'react-dom/client';

// import './styles.css'; // Import CSS file for styling

function App() {
  return (
    <div className="main-container">
      {/* Intro Section */}
      <section id="intro">
        <div className="cover-image">
          <img src="img/cover-image.jpg" alt="Cover" />
        </div>
        <header>
          <h1>ToloPay</h1>
          <p>Your Fast and Secure Online Payment Solution for Ethiopia</p>
          <nav>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
          <a href="https://www.tolopay.com" className="btn">Visit ToloPay</a>
        </header>
      </section>

      {/* Feature Section */}
      <section id="features">
        <div className="feature">
          <img src="img/feature1.jpg" alt="Feature 1" />
          <h2>Instant Money Transfer</h2>
          <p>Send money instantly to friends and family within ToloPay or to linked bank accounts.</p>
        </div>
        <div className="feature">
          <img src="img/feature2.jpg" alt="Feature 2" />
          <h2>Real-time Notifications</h2>
          <p>Stay informed with instant notifications for successful transactions and account updates.</p>
        </div>
        <div className="feature">
          <img src="img/feature3.jpg" alt="Feature 3" />
          <h2>Bank Account Integration</h2>
          <p>Link your bank account for faster and more convenient transactions.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="about-content">
          <h2>About ToloPay</h2>
          <p>ToloPay was inspired by the need for a convenient and secure online payment solution in Ethiopia. As a Portfolio Project for Holberton School, our team embarked on this journey to address the challenges faced by users in the Ethiopian financial landscape. With a focus on user-friendly features and regulatory compliance, ToloPay aims to revolutionize online payments in Ethiopia.</p>
          <div className="team-members">
            <h3>Meet the Team</h3>
            <ul>
              <li><a href="https://www.linkedin.com/user">LinkedIn</a></li>
              <li><a href="https://github.com/user">GitHub</a></li>
              <li><a href="https://twitter.com/user">Twitter</a></li>
            </ul>
          </div>
          <a href="https://github.com/tolopay" className="btn">View ToloPay on GitHub</a>
        </div>
      </section>
    </div>
  );
}

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.createRoot(document.getElementById("root")).render(<App />)