import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPosts = (userId: void) => {
  return client.get<Post[]>('/posts');
};
