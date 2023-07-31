import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (postId: number, data: CommentData) => {
  return client.post<Comment>('/comments', {
    ...data,
    postId,
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete<number>(`/comments/${commentId}`);
};
