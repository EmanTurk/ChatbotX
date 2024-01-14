import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginBox from '../src/components/loginbox/LoginBox.jsx'; 
import SignUp from '../src/components/loginbox/SignUp.jsx'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Wellcome 2 ChatbotX</h1>
        <h2>Your app for finding a volunteer partner</h2>

        <Routes>
          <Route path="/" element={<LoginBox />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
