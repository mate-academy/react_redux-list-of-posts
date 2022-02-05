/* eslint-disable @typescript-eslint/quotes */
import { Comment } from '../types/Comment';

export function getCommentsOfPost(id: number): Promise<Comment[]> {
  return fetch(`https://mate.academy/students-api/comments?postId=${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('error');
      }

      return response.json();
    });
}

export function deleteComment(id: number): Promise<Comment> {
  return fetch(`https://mate.academy/students-api/comments/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        throw new Error('error');
      }

      return response.json();
    });
}

export async function createComment(
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> {
  const response = await fetch('https://mate.academy/students-api/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
}
