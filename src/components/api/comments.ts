import { BASE_URL } from './api';

export const getComments = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return res.json();
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const addComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment[]> => {
  const res = await fetch(
    `${BASE_URL}/comments`,
    {
      method: 'POST',
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  return res.json();
};
