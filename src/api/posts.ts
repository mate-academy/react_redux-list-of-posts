import { fetchClient } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number) => {
  return fetchClient.get<Post[]>(`/users/${userId}/posts`);
};
