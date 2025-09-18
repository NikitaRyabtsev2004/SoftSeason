import React from 'react';
import './Footer.css';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>© 2025 SoftSeason. Все права защищены.</div>
      <div>
        <a href="/privacy">Политика конфиденциальности</a> | <a href="/terms">Условия использования</a>
      </div>
    </motion.footer>
  );
}

export default Footer;