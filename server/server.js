const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3001;

// Подключение к базе данных
const db = new sqlite3.Database('./products.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных products.db');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Функция для преобразования Python-строки в JSON
const parsePythonArray = (str) => {
  try {
    const cleanedStr = str
      .replace(/'/g, '"')
      .replace(/\s*,\s*/g, ',')
      .replace(/\[|\]/g, match => match === '[' ? '[' : ']');
    return JSON.parse(cleanedStr);
  } catch (error) {
    console.error('Ошибка парсинга строки:', str, error.message);
    return [];
  }
};

// Функция для чтения изображения и преобразования в base64
const getImageBase64 = async (folder, file) => {
  try {
    const filePath = path.join(__dirname, 'public', folder, file);
    const data = await fs.readFile(filePath);
    const ext = path.extname(file).toLowerCase();
    const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mimeType};base64,${data.toString('base64')}`;
  } catch (error) {
    console.error(`Ошибка чтения файла ${file} из ${folder}:`, error.message);
    return null; // Возвращаем null, если файл не найден
  }
};

// API для получения всех товаров
app.get('/products', async (req, res) => {
  db.all('SELECT * FROM products', [], async (err, rows) => {
    if (err) {
      console.error('Ошибка запроса:', err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
      return;
    }

    const products = await Promise.all(rows.map(async (row) => {
      const imgArray = parsePythonArray(row.img);
      const imgMArray = parsePythonArray(row.imgM);

      // Читаем изображения из папок и преобразуем в base64
      const images = (await Promise.all(imgArray.map(file => getImageBase64('img', file)))).filter(img => img !== null);

      const materialImages = (await Promise.all(imgMArray.map(file => getImageBase64('imgM', file)))).filter(img => img !== null);

      return {
        ...row,
        img: images,
        imgM: materialImages,
      };
    }));

    res.json(products);
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});