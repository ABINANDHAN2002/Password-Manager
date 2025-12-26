import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

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
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
            style={{ marginRight: '5px' }}
          />
          Show Passwords
        </label>
      </div>

      {passwords.length === 0 ? (
        <p>No saved passwords yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {passwords.map(({ id, website, username, password }) => (
            <li key={id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
              <strong>{website}</strong><br />
              👤 {username} <br />
              🔑 {showPasswords ? decryptPassword(password) : '••••••••'} <br />
              <button
                onClick={() => deletePassword(id)}
                style={{ marginTop: '5px', padding: '4px 8px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PasswordList;
