import { useState } from 'react';

interface UpdateProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct: (updatedProduct: Product) => any;
}

const UpdateProductModal = ({
  product,
  isOpen,
  onClose,
  onUpdateProduct,
}: UpdateProductModalProps) => {
  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [images, setImages] = useState<string>(
    Array.isArray(product.images) ? product.images.join(',') : product.images || ''
  );
  const [price, setPrice] = useState<number>(product.price);
  const [attributes, setAttributes] = useState<Attribute[]>(
    Array.isArray(product.attributes) ? product.attributes : [{ name: '', value: '' }]
  );

  const handleAttributeChange = (index: number, field: keyof Attribute, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: '', value: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProduct: Product = {
      id: product.id,
      name,
      description,
      images: images.split(',').map((img) => img.trim()),
      price,
      attributes,
    };
    console.log(updatedProduct)
    await onUpdateProduct(updatedProduct);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Images (comma-separated URLs)</label>
            <input
              type="text"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Attributes</label>
            {attributes.map((attr, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={attr.name}
                  onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAttribute}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Attribute
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
