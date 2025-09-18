import React, { useState, useRef, useEffect } from 'react';
import './HeroSection.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function HeroSection() {
  const [showButtons, setShowButtons] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const calculateTextShadow = (element) => {
    const baseOffset = 0;
    const intensity = 15;
    const offsetX = baseOffset + mousePosition.x * intensity;
    const offsetY = baseOffset + mousePosition.y * intensity;
    return `${offsetX}px ${offsetY}px 15px rgba(0, 0, 0, 0.72)`;
  };

  const scrollToProducts = () => {
    const productList = document.querySelector('.content');
    if (productList) {
      const targetPosition = productList.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition - 80;
      const duration = 1000;
      let startTime = null;

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = progress => -(Math.cos(Math.PI * progress) - 1) / 2;
        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.div 
      className="hero"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      ref={heroRef}
    >
      <div className="hero-content">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ textShadow: calculateTextShadow() }}
        >
          Вязаные вещи с душой
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ textShadow: calculateTextShadow() }}
        >
          Уникальные изделия ручной работы для вашего тепла и стиля
        </motion.p>
        <div className="button-container">
          <div>
            {!showButtons ? (
              <motion.button
                key="initial-button"
                className="hero-button"
                whileHover={{ scale: 1.1, boxShadow: "0 6px 20px rgba(255, 107, 107, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={() => setShowButtons(true)}
                style={{ boxShadow: calculateTextShadow() }}
              >
                Посмотреть коллекцию
              </motion.button>
            ) : (
              <motion.div 
                className="button-group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, staggerChildren: 0.2 }}
              >
                <motion.button
                  className="hero-button secondary"
                  whileHover={{ scale: 1.1, boxShadow: "0 6px 20px rgba(77, 171, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={scrollToProducts}
                  style={{ boxShadow: calculateTextShadow() }}
                >
                  К товарам
                </motion.button>
                <motion.button
                  className="hero-button primary"
                  whileHover={{ scale: 1.1, boxShadow: "0 6px 20px rgba(255, 107, 107, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ boxShadow: calculateTextShadow() }}
                >
                  <Link to="/catalog">В каталог</Link>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;