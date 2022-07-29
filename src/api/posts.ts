import { Post } from '../types/post';
import { BASE_URL, request } from './api';

export const getPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  let response;

  if (!userId) {
    response = await getPosts();
  } else {
    response = await request(`/posts?userId=${userId}`);
  }

  return response;
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};

export const deletePost = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
};
