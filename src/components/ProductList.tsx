import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { searchProducts } from '../services/productService';

interface ProductListProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductList = ({ products, setProducts, onUpdateProduct, onDeleteProduct }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
      handleSearch();
  }, [debouncedSearchTerm]);

  const handleSearch = useCallback(async () => {
    const result = await searchProducts(debouncedSearchTerm);
    setProducts(result);
  }, [debouncedSearchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setProducts([]);
    handleSearch();
  };

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input 
          type="text" 
          placeholder="Search by name or attributes" 
          value={searchTerm}
          onInputCapture={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {searchTerm && <button
          onClick={handleClearSearch}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Clear
        </button>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
