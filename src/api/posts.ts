import { Post } from '../react-app-env';
import { BASE_URL } from './api';

export const getAllPosts = async ():Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getUserPosts = async (userId: number):Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return response.json();
};

export const getPostDetails = async (postId: number):Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};

export const deletePostById = async (postId: number):Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`,
    { method: 'DELETE' });

  return response.json();
};
