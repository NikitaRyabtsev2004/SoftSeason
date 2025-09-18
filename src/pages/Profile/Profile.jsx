import React, { useState } from 'react';
import './Profile.css';
import { motion } from 'framer-motion';

function Profile() {
  const [email, setEmail] = useState('');

  return (
    <motion.div 
      className="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Профиль</h1>
      <div className="profile-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите ваш email"
        />
      </div>
    </motion.div>
  );
}

export default Profile;