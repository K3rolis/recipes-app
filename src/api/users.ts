import axios from 'axios';
import { API_URL } from '../configs/config';
import { UserProps } from '../types/users';

export const createUser = async (user: UserProps) => {
  return await axios.post(`${API_URL}/users`, user);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`).then((res) => res.data);
};

export const getUser = async (id: number) => {
  return await axios.get(`${API_URL}/users/${id}`).then((res) => res.data);
};

export const updateUser = async ({ id, ...user }: any) => {
  return await axios.put(`${API_URL}/users/${id}`, user);
};

export const deleteUser = async (id: number) => {
  return await axios.delete(`${API_URL}/users/${id}`);
};
