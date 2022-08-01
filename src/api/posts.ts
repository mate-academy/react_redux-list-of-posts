import { Post } from '../react-app-env';
import { BASE_URL } from './api';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
}

export async function getPostDetails(postId: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
}

export async function deletePostById(postId: number): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}`,
    { method: 'DELETE' });

  return response.json();
}
