// import { client } from '../utils/axiosClient';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (
  comment: Omit<Comment, 'id'>,
): Promise<Comment> => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
