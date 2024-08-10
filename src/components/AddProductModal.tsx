import { useState, useEffect } from 'react';
import { instance } from '../lib/axiosInstance';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await instance.get('/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);

    if (categoryName) {
      const category = categories.find(cat => cat.name === categoryName);
      if (category) {
        setAttributes(category.attributes.map(attr => ({ name: attr, value: '' })));
      }
    } else {
      setAttributes([]);
    }
  };

  const handleAttributeChange = (index, value) => {
    const newAttributes = [...attributes];
    newAttributes[index].value = value;
    setAttributes(newAttributes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      name: formData.get('name'),
      category: selectedCategory,
      description: formData.get('description'),
      images: formData.get('images').split(','), // Expecting a comma-separated string for images
      price: parseFloat(formData.get('price')),
      attributes,
    };
    onAddProduct(productData);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select 
              name="category" 
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              required 
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea 
              name="description" 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Images (comma-separated URLs)</label>
            <input 
              name="images" 
              type="text" 
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
              required 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {attributes.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700">Attributes</label>
              {attributes.map((attr, index) => (
                <div key={index} className="mb-2">
                  <label className="block text-gray-600">{attr.name}</label>
                  <input 
                    type="text" 
                    value={attr.value} 
                    onChange={(e) => handleAttributeChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
            </div>
          )}

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
