import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './Passwordlist.css'; 

function PasswordList({ passwords, deletePassword, secretKey, isUnlocked }) {
  const [showPasswords, setShowPasswords] = useState(false);

  const decryptPassword = (encrypted) => {
    try {
      return CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return 'Error';
    }
  };

  if (!isUnlocked) {
    return <p>🔐 Locked. Enter your master password to view saved passwords.</p>;
  }

  return (
    <div className="password-list">
      <div className="show-passwords">
        <label>
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
          />
          Show Passwords
        </label>
      </div>

      {passwords.length === 0 ? (
        <p>No saved passwords yet.</p>
      ) : (
        <ul>
          {passwords.map(({ id, website, username, password }) => (
            <li key={id}>
              <strong>{website}</strong><br />
              👤 {username} <br />
              🔑 {showPasswords ? decryptPassword(password) : '••••••••'} <br />
              <button onClick={() => deletePassword(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PasswordList;
