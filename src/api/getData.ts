import {
  POSTS, COMMENTS, USERS, URL,
} from './constants';

async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = (): Promise<PostInterface[]> => {
  return getData(URL + POSTS);
};

export const getComments = (): Promise<CommentInterface[]> => {
  return getData(URL + COMMENTS);
};

export const getUsers = (): Promise<UserInterface[]> => {
  return getData(URL + USERS);
};
