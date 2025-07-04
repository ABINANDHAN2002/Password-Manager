import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function PasswordList({ passwords, deletePassword, secretKey, isUnlocked }) {
  const [showPasswords, setShowPasswords] = useState(false);

  const decrypt = (encrypted) => {
    try {
      return CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return 'Decryption error';
    }
  };

  if (!isUnlocked) {
    return <p>🔐 Locked. Please enter master password to view saved passwords.</p>;
  }

  return (
    <div className="list-container">
      <div className="toggle">
        <label>
          <input type="checkbox" checked={showPasswords} onChange={() => setShowPasswords(!showPasswords)} />
          Show Passwords
        </label>
      </div>

      {passwords.length === 0 ? (
        <p>No saved passwords.</p>
      ) : (
        <ul>
          {passwords.map(({ id, website, username, password }) => (
            <li key={id}>
              <strong>{website}</strong> <br />
              👤 {username} <br />
              🔑 {showPasswords ? decrypt(password) : '••••••••'} <br />
              <button onClick={() => deletePassword(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PasswordList;
