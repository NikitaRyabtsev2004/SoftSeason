export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3001/products');
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data = await response.json();
    return data.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.desc,
      image: product.img[0] || '',
      images: product.img,
      materialImage: product.imgM[0] || '',
      category: product.category,
      size: product.size,
      material: product.material,
      color: product.color,
      length: product.length,
      width: product.width,
      sleeve: product.sleeve,
      weight: product.weight,
    }));
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};