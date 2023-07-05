import axios from 'axios';
import { API_URL } from '../configs/config';
import { CommentProps } from '../types/comments';

export const createComment = async (comment: CommentProps) => {
  return await axios.post(`${API_URL}/comments`, comment);
};

export const deleteComment = async (id: number) => {
  return await axios.delete(`${API_URL}/comments/${id}`).then((res) => res.data);
};

export const getComments = async (id: number) => {
  return await axios.get(`${API_URL}/recipes/${id}/comments?&_expand=user`).then((res) => res.data);
};

export const updateComment = async ({ id, userId, description, postedDate, recipeId }: CommentProps) => {
  return await axios.put(`${API_URL}/comments/${id}`, { userId, description, postedDate, recipeId });
};
