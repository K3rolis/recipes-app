import axios from 'axios';
import { API_URL } from '../configs/config';
import { CategoriesProps } from '../types/categories';

export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`).then((res) => res.data);
};

export const getRecipesByCategory = async (category: number) => {
  return await axios.get(`${API_URL}/categories/${category}?_embed=recipes`).then((res) => res.data);
};

export const createCategory = async (newCategory: CategoriesProps) => {
  return await axios.post(`${API_URL}/categories`, newCategory);
};

export const deleteCategory = async (id: number) => {
  return await axios.delete(`${API_URL}/categories/${id}`);
};

export const updateCategory = async ({ id, ...category }: CategoriesProps) => {
  return await axios.put(`${API_URL}/categories/${id}`, category);
};
