import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    return await client.get<Post[]>(`/posts?userId=${userId}`);
  } catch (error) {
    throw new Error('Failed to fetch user posts.');
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    return await client.get<Post[]>('/posts');
  } catch (error) {
    throw new Error('Failed to fetch posts.');
  }
};
