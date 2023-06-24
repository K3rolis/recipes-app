import axios from 'axios';
import { API_URL } from '../configs/config';

export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`).then((res) => res.data);
};

export const getRecipesByCategory = async (category: number) => {
  return await axios.get(`${API_URL}/categories/${category}?_embed=recipes`).then((res) => res.data);
};
