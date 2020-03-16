import { PostType, CommentType, UserType } from './interfaces';

const API_URL = 'https://jsonplaceholder.typicode.com/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = (): Promise<PostType[]> => {
  return getData(`${API_URL}posts`);
};

export const getUsers = (): Promise<UserType[]> => {
  return getData(`${API_URL}users`);
};

export const getComments = (): Promise<CommentType[]> => {
  return getData(`${API_URL}comments`);
};
