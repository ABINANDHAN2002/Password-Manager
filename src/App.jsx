import React, { useState, useEffect } from 'react';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import './App.css';

function App() {
  const [passwords, setPasswords] = useState(() => {
    const saved = localStorage.getItem('passwords');
    return saved ? JSON.parse(saved) : [];
  });

  const [secretKey, setSecretKey] = useState('');
  const [enteredKey, setEnteredKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = (entry) => {
    setPasswords([...passwords, entry]);
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter((item) => item.id !== id));
  };

  const handleUnlock = () => {
  if (enteredKey === 'Abi@2002') {
    setSecretKey(enteredKey);
    setIsUnlocked(true);
  } else {
    alert('Incorrect master password ❌');
  }
};


  return (
    <div className="app-container">
      <h1>🔐 Password Manager</h1>

      {!isUnlocked && (
        <div className="form">
          <input
            type="password"
            placeholder="Enter Master Password"
            value={enteredKey}
            onChange={(e) => setEnteredKey(e.target.value)}
          />
          <button onClick={handleUnlock}>Unlock</button>
        </div>
      )}

      {isUnlocked && <PasswordForm addPassword={addPassword} secretKey={secretKey} />}
      <PasswordList
        passwords={passwords}
        deletePassword={deletePassword}
        secretKey={secretKey}
        isUnlocked={isUnlocked}
      />
    </div>
  );
}

export default App;
