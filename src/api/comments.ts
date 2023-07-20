import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const postComment = (id: number, comment: Comment) => {
  return client.post(`/comments?postId=${id}`, comment);
};
