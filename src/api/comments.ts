import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
