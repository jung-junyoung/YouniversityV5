import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onLogin }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();  // App의 상태 변경
    navigate('/Report');
  };

  return (
    <div className="SignIn-container">
      <h1 className="SignIn-title">YOUN!VERSITY</h1>
      <form onSubmit={handleSubmit} className="SignIn-form">
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p className="SignIn-footer">
        <span className="SignUp-link" onClick={() => alert("Sign Up page coming soon!")}>
          Sign Up Here!
        </span>
      </p>
    </div>
  );
}

export default SignIn;