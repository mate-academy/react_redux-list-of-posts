import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deletePostComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};

export const addPostComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, data);
};
