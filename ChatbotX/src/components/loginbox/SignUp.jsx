import React, { useState } from 'react';

const SignUp = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signing up with:', { newUsername, newEmail, newPassword });
  };

  return (
    <div className="container">
      <h1>Create an Account</h1>
      <label>
        Username:
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter your new username"
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter your new email"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
        />
      </label>
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
