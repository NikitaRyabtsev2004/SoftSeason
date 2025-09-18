import React, { useContext } from 'react';
import './Cart.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';

function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="cart-header">
              <h3>Корзина</h3>
              <button className="close-cart" onClick={onClose}>✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="empty-cart">Корзина пуста</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.price} руб.</p>
                      </div>
                      <FaTrash className="remove-item" onClick={() => removeFromCart(item.id)} />
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <p>Итого: {totalPrice} руб.</p>
                  <button className="checkout-button">Оформить заказ</button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;