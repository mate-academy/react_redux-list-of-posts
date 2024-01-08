import { Post } from '../types/Post';
import { client } from '../utils/axiosClient';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};
