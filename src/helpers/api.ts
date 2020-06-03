import { API_URL } from '../constants';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts.json`);

  return response.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users.json`);

  return response.json();
};

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/comments.json`);

  return response.json();
};
