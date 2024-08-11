import { useState, useEffect } from 'react';
import AddProductModal from '../components/AddProductModal';
import ProductList from '../components/ProductList';
import { fetchProducts, addProduct, updateProduct, deleteProductById } from '../services/productService';



interface ProductManagerProps {}

const ProductManager: React.FC<ProductManagerProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleAddProduct = async (productData: Product) => {
    const newProduct = await addProduct(productData);
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const product = await updateProduct(updatedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? product : p))
    );
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProductById(productId);
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  };

  return (
    <div className="p-8 min-h-screen">
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Product
      </button>
      <ProductList
        products={products}
        setProducts={setProducts}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductManager;