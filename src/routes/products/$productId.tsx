import { useState, useEffect } from 'react';
import { useParams, createFileRoute } from '@tanstack/react-router';
import { fetchProductById } from '../../services/productService';

export const Route = createFileRoute('/products/$productId')({
  component: () => {
    const { productId } = useParams({ from: '/products/$productId' });
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const data = await fetchProductById(productId);
          setProduct(data);
        } catch (err) {
          setError('Failed to fetch product');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{product?.name}</h1>
        <p className="text-lg mb-4">{product?.description}</p>
        <p className="text-2xl font-semibold mb-6">Price: ${product?.price}</p>

        {product?.images && product.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {product.images.map((image, index) => (
              <div key={index} className="w-full h-64 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-gray-700">
          {product?.attributes && product.attributes.length > 0 ? (
            <ul className="list-disc pl-6">
              {product.attributes.map((attr, index) => (
                <li key={index} className="mb-2">
                  <strong>{attr.name}:</strong> {attr.value}
                </li>
              ))}
            </ul>
          ) : (
            <p>No attributes available</p>
          )}
        </div>
      </div>
    );
  },
});
