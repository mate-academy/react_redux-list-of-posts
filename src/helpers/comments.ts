import { request } from './api';
import { Comment } from '../types';

export function getPostComments(postId: number): Promise<Comment[]> {
  return request(`comments?postId=${postId}`);
}

export function getComment(commentId: number): Promise<Comment> {
  return request(`comments/${commentId}`);
}

export function removePostComment(commentId: number) {
  return request(`comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function editPostComment(commentId: number, comment: Comment) {
  return request(`comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};

export function addPostComment(comment: Comment) {
  return request('comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};
