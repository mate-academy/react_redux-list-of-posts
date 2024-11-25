import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number) => {
  const res = await client.get<Post[]>(`/posts?userId=${userId}`);

  if (Array.isArray(res)) {
    return res;
  }

  throw new Error(`Failed to fetch posts for user ${userId}`);
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};
