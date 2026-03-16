// import { client } from '../utils/axiosClient';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostCommentsApi = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createCommentApi = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteCommentApi = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
