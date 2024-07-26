import React, { useState } from 'react';
import './NameModal.css';

const NameModal = ({ onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.length >= 3) {
      onSave(name);
    } else {
      alert('Initials must be at least 3 characters long.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter your Initials</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NameModal;