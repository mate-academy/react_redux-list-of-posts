import { BASE_URL, request } from './api';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};

export const deletePost = async (postId: number) => {
  await request(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
};
