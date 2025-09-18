import React, { useState } from 'react';
import './Home.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductList from '../../components/ProductList/ProductList';
import { motion } from 'framer-motion';

function Home() {
  const [sortOption, setSortOption] = useState('price-asc');
  const [filters, setFilters] = useState({
    sweaters: false,
    scarves: false,
    hats: false,
  });

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleFilter = (filterName, checked) => {
    setFilters(prev => ({ ...prev, [filterName]: checked }));
  };

  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <HeroSection />
      <div className="content">
        <Sidebar 
          onSort={handleSort} 
          currentSort={sortOption} 
          onFilter={handleFilter} 
          currentFilters={filters} 
        />
        <ProductList />
      </div>
    </motion.div>
  );
}

export default Home;