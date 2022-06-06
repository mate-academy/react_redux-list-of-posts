import { request, remove } from './api';

export const getAllPosts = async () => {
  return request('/posts');
};

export const getUserPosts = async (userId: number) => {
  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = async (postId: number) => {
  return request(`/posts/${postId}`);
};

export const deletePost = async (postId: number) => {
  return remove(`/posts/${postId}`);
};
