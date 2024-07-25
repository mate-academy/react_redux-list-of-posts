import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const commentsService = {
  get: (postId: number) => client.get<Comment[]>(`/comments?postId=${postId}`),
  delete: (commentId: number) => client.delete(`/comments/${commentId}`),
  create: (data: Omit<Comment, 'id'>) =>
    client.post<Comment>('/comments', data),
};
