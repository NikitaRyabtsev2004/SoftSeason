import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../utils/api';
import { CartContext } from '../../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const isInCart = cart.some(item => item.id === parseInt(id));

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
          setCurrentImage(foundProduct.image); // Устанавливаем титульное изображение
        } else {
          setError('Товар не найден');
        }
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить товар');
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <motion.div 
      className="product-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="product-container">
        <div className="product-image-container">
          <motion.img 
            src={currentImage} 
            alt={product.name}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="main-image"
          />
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <motion.img 
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${img === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(img)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <img src={product.materialImage} alt="Material" className="material-image" />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="price">{product.price} руб.</p>
          <p className="description">{product.description}</p>
          <p className="size"><strong>Размер:</strong> {product.size}</p>
          <p className="material"><strong>Материал:</strong> {product.material}</p>
          <p className="color"><strong>Цвет:</strong> {product.color}</p>
          {product.length && <p className="length"><strong>Длина:</strong> {product.length}</p>}
          {product.width && <p className="width"><strong>Ширина:</strong> {product.width}</p>}
          {product.sleeve && <p className="sleeve"><strong>Рукав:</strong> {product.sleeve}</p>}
          <p className="weight"><strong>Вес:</strong> {product.weight} г</p>
          <motion.button 
            className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => !isInCart && addToCart(product)}
            disabled={isInCart}
          >
            {isInCart ? 'Добавлено' : 'Добавить в корзину'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductPage;