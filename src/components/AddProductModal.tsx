import { useState, ChangeEvent } from 'react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const AddProductModal = ({ isOpen, onClose, onAddProduct }: AddProductModalProps) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string>('');
  const [price, setPrice] = useState<string>('');

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
    const imagesArray = images.split(',').map((img) => img.trim());
    const productData: Product = {
      name,
      description,
      images: imagesArray,
      price: parseFloat(price),
      attributes,
    };
    onAddProduct(productData);

    setName('');
    setDescription('');
    setImages('');
    setPrice('');
    setAttributes([]);

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              name="name"
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
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Images (comma-separated URLs)</label>
            <input
              name="images"
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
              name="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Attributes</label>
            {attributes.map((attr, index) => (
              <div key={index} className="mb-2 flex space-x-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={attr.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleAttributeChange(index, 'name', e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleAttributeChange(index, 'value', e.target.value)
                  }
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
              className="mr-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
