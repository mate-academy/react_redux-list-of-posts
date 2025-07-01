import { client } from '../utils/fetchClient';
import { Post as PostType } from '../types/Post';

export const getUserPosts = (userId: number): Promise<PostType[]> => {
  return client.get<PostType[]>(`/posts?userId=${userId}`);
};

export const getPosts = (): Promise<PostType[]> => {
  return client.get<PostType[]>('/posts');
};
