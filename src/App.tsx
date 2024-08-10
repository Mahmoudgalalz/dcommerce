import { useState } from 'react';
import ProductList from './components/ProductList';
import AddProductModal from './components/AddProductModal';

const ProductManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (productData) => {
    // Send the product data to your API or update the state in your application
    console.log(productData);
  };

  return (
    <div>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Product
      </button>
      <ProductList />
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductManager;
