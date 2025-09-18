import React from 'react';
import './Sidebar.css';
import { motion } from 'framer-motion';

function Sidebar({ onSort, currentSort, onFilter, currentFilters }) {
  return (
    <motion.aside 
      className="sidebar"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Сортировка</h3>
      <motion.select 
        value={currentSort} 
        onChange={(e) => onSort(e.target.value)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="name-asc">Имя: A-Z</option>
      </motion.select>
      <h3>Фильтры</h3>
      <motion.div 
        className="filter-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label>
          <input 
            type="checkbox" 
            checked={currentFilters.sweaters}
            onChange={(e) => onFilter('sweaters', e.target.checked)}
          /> Свитеры
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={currentFilters.scarves}
            onChange={(e) => onFilter('scarves', e.target.checked)}
          /> Шарфы
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={currentFilters.hats}
            onChange={(e) => onFilter('hats', e.target.checked)}
          /> Шапки
        </label>
      </motion.div>
    </motion.aside>
  );
}

export default Sidebar;