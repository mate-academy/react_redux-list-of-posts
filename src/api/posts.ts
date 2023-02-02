import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/post1s?userId=${userId}`);
};

export const setUserPosts = (data: Omit<Post, 'id'>) => {
  return client.post<Comment>('/posts', data);
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};
