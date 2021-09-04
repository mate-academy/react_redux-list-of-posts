import { BASE_URL, request } from './api';
import { Comment } from '../types';

export function getComments(commentId: number) {
  return request(`${BASE_URL}comments?postId=${commentId}`);
}

export function removeComment(commentId: number) {
  console.log('removeComment api', `${BASE_URL}comments/${commentId}`);
  return request(`${BASE_URL}comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function addComment(comment: Comment) {
  return request(`${BASE_URL}comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
}
