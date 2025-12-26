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

  // Save passwords to localStorage whenever it changes
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
    // Master password check
    if (enteredKey === 'Abi@2002') {
      setSecretKey(enteredKey);
      setIsUnlocked(true);
    } else {
      alert('❌ Incorrect master password');
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🔐 Password Manager</h1>

      {!isUnlocked && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Enter Master Password"
            value={enteredKey}
            onChange={(e) => setEnteredKey(e.target.value)}
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          <button
            onClick={handleUnlock}
            style={{ padding: '8px 12px', cursor: 'pointer', width: '100%' }}
          >
            Unlock
          </button>
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
