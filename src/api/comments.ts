import { fetchClient } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = async (postId: number) => {
  return fetchClient.get<Comment[]>(`/posts/${postId}/comments`);
};

export const createComment = async (comment: Comment) => {
  return fetchClient.post<Comment>('/comments', comment);
};

export const deleteComment = async (commentId: number) => {
  return fetchClient.delete(`/comments/${commentId}`);
};
