import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

function PasswordForm({ addPassword, secretKey }) {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!website || !username || !password) return;

    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    addPassword({ id: uuidv4(), website, username, password: encryptedPassword });

    setWebsite('');
    setUsername('');
    setPassword('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default PasswordForm;
