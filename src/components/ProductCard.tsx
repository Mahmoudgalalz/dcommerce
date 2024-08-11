import { useState } from 'react';
import UpdateProductModal from './UpdateProductModal';
import { Link } from '@tanstack/react-router';


interface ProductCardProps {
  product: Product;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductCard = ({ product, onUpdateProduct, onDeleteProduct }: ProductCardProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white text-gray-600">
      <img className="w-full h-48 object-cover mb-4" src={product.images[0]} alt={product.name} />
      <Link to={`/products/${product.id}`} className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
        <p className="text-sm text-gray-600">
          {Array.isArray(product.attributes) && product.attributes.length > 0
            ? product.attributes.map(attr => `${attr.name}: ${attr.value}`).join(', ')
            : 'No attributes available'}
        </p>
      </Link>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteProduct(product.id ? product.id: '')}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* UpdateProductModal Component */}
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={product}
        onUpdateProduct={onUpdateProduct}
      />
    </div>
  );
};

export default ProductCard;
