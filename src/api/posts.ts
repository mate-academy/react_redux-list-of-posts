import { Post } from '../types/Post';
import { client } from './fetchClient';

export const getUserPosts = (userId?: number) => {
  const endpoint = userId ? `/posts?userId=${userId}` : '/posts';

  return client.get<Post[]>(endpoint);
};

export const createPost = (data: Omit<Post, 'id'>) => {
  return client.post<Post>('/posts', data);
};

export const removePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};
