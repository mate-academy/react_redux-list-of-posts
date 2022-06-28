import { NewComment } from '../react-app-env';

export const BASE_URL = 'https://mate.academy/students-api';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users/`);

  return response.json();
};

export const getUserPosts = async (userId: string) => {
  let response;

  if (userId === '0') {
    response = await fetch(`${BASE_URL}/posts/`);
  } else {
    response = await fetch(`${BASE_URL}/posts/?userId=${userId}`);
  }

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });

  return response.json();
};

export const addComment = async (obj: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};
