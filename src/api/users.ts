import axios from 'axios';
import { API_URL } from '../configs/config';
import { UserProps } from '../types/users';

export const createUser = async (user: UserProps) => {
  return await axios.post(`${API_URL}/users`, user);
};
