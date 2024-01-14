import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginBox.css';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { email, username, password });
  };

  return (
    <div className="container">
      <h2>Please Login</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account yet?{' '}
        <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginBox;

