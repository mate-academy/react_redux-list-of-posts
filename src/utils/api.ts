import {
  BASE_URL,
  CommentInterface,
  COMMENTS_URL,
  PostInterface,
  POSTS_URL,
  UserInterface,
  USERS_URL,
} from '../constants';

const getDataFromServer = async <T>(url: string): Promise<T> => {
  const data = await fetch(`${BASE_URL}${url}`);

  return data.json();
};

export const getUsers: () => Promise<UserInterface[]> = async () => {
  const users = await getDataFromServer<UserInterface[]>(USERS_URL);

  return users;
};

export const getComments: () => Promise<CommentInterface[]> = async () => {
  const comments = await getDataFromServer<CommentInterface[]>(COMMENTS_URL);

  return comments;
};

export const getPosts: () => Promise<PostInterface[]> = async () => {
  const posts = await getDataFromServer<PostInterface[]>(POSTS_URL);

  return posts;
};
