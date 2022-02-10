import { request } from './api';

export const getPostComments = (postId: number) => {
  return request<PostComment[]>(`comments?postId=${postId}`);
};

export const deleteCommentInPost = (commentId: number) => {
  return request<PostComment>(`comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addCommentToPost = (comment: NewComment) => {
  return request<PostComment>('comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
