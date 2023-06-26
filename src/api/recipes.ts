import axios from 'axios';
import { API_URL } from '../configs/config';

export const createRecipe = async (recipe: any) => {
  return await axios.post(`${API_URL}/recipes/`, recipe);
};

export const getRecipe = async (id: number) => {
  return await axios.get(`${API_URL}/recipes/${id}?&_expand=category`).then((res) => res.data);
};

export const updateRecipe = async ({ id, ...recipe }: any) => {
  return await axios.put(`${API_URL}/recipes/${id}`, recipe);
};

export const deleteRecipe = async (id: number) => {
  return await axios.delete(`${API_URL}/recipes/${id}`);
};

export const getRecipes = async () => {
  return await axios.get(`${API_URL}/recipes?&_limit=5`).then((res) => res.data);
};
