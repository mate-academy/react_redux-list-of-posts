import { BASE_URL } from './api';
import { Comment } from '../types/Comment';
import { NewComment } from '../types/NewComment';

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const removeComment = async (commentId: number): Promise<Comment> => {
  const response = await fetch(
    `${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' },
  );

  return response.json();
};

export const addComment = async (newComment: NewComment): Promise<Comment> => {
  const response = await fetch(
    `${BASE_URL}/comments/`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newComment),
    },
  );

  return response.json();
};
