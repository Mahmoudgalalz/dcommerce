import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts, searchProducts } from '../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, []);

  const handleSearch = async () => {
    const result = await searchProducts({ searchTerm });
    setProducts(result);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-6 flex justify-center">
        <input 
          type="text" 
          placeholder="Search by name, category, or attributes" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
