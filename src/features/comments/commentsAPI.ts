// import { client } from '../utils/axiosClient';
import { client } from '../../utils/fetchClient';
import { Comment, CommentData } from '../../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete<number>(`/comments/${commentId}`);
};
