import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

function PasswordForm({ addPassword, secretKey }) {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!website || !username || !password) return;

    // Encrypt password before saving
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    addPassword({ id: uuidv4(), website, username, password: encryptedPassword });

    // Reset form
    setWebsite('');
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <form className="password-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', width: '100%' }}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer' }}>Add Password</button>
    </form>
  );
}

export default PasswordForm;
