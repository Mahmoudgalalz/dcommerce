const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white text-gray-600">
      <img className="w-full h-48 object-cover mb-4" src={product.images[0]} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
        <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
        <p className="text-sm text-gray-600">
          {product.attributes.map(attr => `${attr.name}: ${attr.value}`).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
