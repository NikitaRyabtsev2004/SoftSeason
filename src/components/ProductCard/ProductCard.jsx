import React, { useContext } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../../context/CartContext';
import { transliterate } from '../../utils/transliterate';

function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const isInCart = cart.some(item => item.id === product.id);

  return (
    <motion.div 
      className="product-card"
      whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}/${transliterate(product.name)}`} className="product-link">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="no-image">Изображение недоступно</div>
          )}
          {product.materialImage ? (
            <img src={product.materialImage} alt="Material" className="material-image" />
          ) : (
            <div className="no-material-image">Материал недоступен</div>
          )}
          <div className="product-overlay">
            <p className="product-description">{product.description}</p>
          </div>
        </div>
        <h4>{product.name}</h4>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price} руб.</p>
        <p className="product-material">{product.material}</p>
        <p className="product-color">{product.color}</p>
      </Link>
      <motion.button 
        className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
        whileTap={{ scale: 0.95 }}
        onClick={() => !isInCart && addToCart(product)}
        disabled={isInCart}
      >
        {isInCart ? 'Добавлено' : 'В корзину'}
      </motion.button>
    </motion.div>
  );
}

export default ProductCard;