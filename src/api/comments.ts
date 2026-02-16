// import { client } from '../utils/axiosClient';
import { client } from '../utils/fetchClient';
import { PostComment } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<PostComment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<PostComment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
