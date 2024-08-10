import { instance } from "../lib/axiosInstance";


export const fetchProducts = async () => {
  const response = await instance.get('/products');
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await instance.get(`/products/search`, { params: query });
  return response.data;
};
