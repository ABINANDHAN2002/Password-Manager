import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import './Passwordform.css'; 

function PasswordForm({ addPassword, secretKey }) {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!website || !username || !password) return;

    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    addPassword({ id: uuidv4(), website, username, password: encryptedPassword });

    setWebsite('');
    setUsername('');
    setPassword('');
    setShowPassword(false);
  }

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      <button type="submit">Add Password</button>
    </form>
  );
}

export default PasswordForm;
