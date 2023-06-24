import axios from 'axios';
import { API_URL } from '../configs/config';

export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`).then((res) => res.data);
};
