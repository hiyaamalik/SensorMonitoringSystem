import React from 'react';
import "../styles/AuthModal.css";

const AuthModal = ({ mode, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <h2>{mode === 'login' ? 'Login to Dashboard' : 'Create Account'}</h2>

        <form className="auth-form">
          {mode === 'register' && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {mode === 'register' && (
            <input type="password" placeholder="Confirm Password" required />
          )}

          <button type="submit">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default AuthModal;
