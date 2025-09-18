import React, { useState, useContext } from 'react';
import './Header.css';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Cart from '../Cart/Cart';
import { CartContext } from '../../context/CartContext';

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className="header"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="logo-container"
        onClick={() => navigate('/')}
      >
        <img
          src="./ball12.png"
          alt="KnitShop Logo"
          className="logo-image"
        />
        <div className="logo">SoftSeason</div>
      </div>
      <motion.nav className={isMenuOpen ? 'nav-open' : ''}>
        <motion.ul>
          <motion.li><Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link></motion.li>
          <motion.li><Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Каталог</Link></motion.li>
          <motion.li><Link to="/about" onClick={() => setIsMenuOpen(false)}>О нас</Link></motion.li>
          <motion.li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Профиль</Link></motion.li>
        </motion.ul>
      </motion.nav>
      <div className="icons">
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          <FaShoppingCart />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
        <Link to="/profile" onClick={() => setIsMenuOpen(false)}><FaUser /></Link>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <AnimatePresence>
        {isCartOpen && (
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;