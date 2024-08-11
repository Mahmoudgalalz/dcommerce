import { instance } from "../lib/axiosInstance";


export const fetchProducts = async () => {
  const response = await instance.get('/products');
  return response.data;
};

export const fetchProductById = async (id:string) => {
  const response = await instance.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await instance.get(`/products/search`, { params: {name: query} });
  return response.data;
};

export const deleteProductById = async (id: string) => {
  const response = await instance.delete(`/products/${id}`);
  return response.data;
};
export const updateProduct = async (data:any) => {
  const response = await instance.put(`/products/${data.id}`, data);
  return response.data;
};

export const addProduct = async (data:any) => {
  const response = await instance.post(`/products`, data);
  return response.data;
};

