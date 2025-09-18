import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import ProductPage from './components/ProductPage/ProductPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:id/:slug" element={<ProductPage />} />
              <Route path="/catalog" element={<ProductList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;