import { BASE_URL } from './api';
import { Post } from '../types/Post';

export const fetchPosts = async (userId: number): Promise<Post[]> => {
  const endpoint = userId === 0 ? '/posts' : `/posts?userId=${userId}`;

  const response = await fetch(`${BASE_URL}${endpoint}`);

  return response.json();
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
