import { Post } from '../react-app-env';

export const BASE_URL = 'https://mate.academy/students-api/';

export async function getPosts(userId: string): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getPostbyId(postId:number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function deletePost(id : number) {
  const result = await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' });

  return result;
}
