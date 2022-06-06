import { Comment } from '../types/Comment';
import { request, remove, post } from './api';

export const getPostComments = async (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deletePostComment = async (commentId: number) => {
  return remove(`/comments/${commentId}`);
};

export const addPostComment = async (data: Omit<Comment, 'id'>) => {
  return post('/comments', data);
};
