import { Comment, NewComment } from '../react-app-env';
import { BASE_URL } from './api';

export async function getPostComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}

export async function deleteComment(commentId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });

  return response.json();
}

export async function addComment(comment: NewComment): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    });

  return response.json();
}
