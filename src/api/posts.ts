import { request, BASE_URL } from './api';

export const getUsersPosts = () => request('/posts');

export const getUserPostsByID = (userId: number) => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);

export const deletePostByID = async (postId: number) => {
  await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
};
