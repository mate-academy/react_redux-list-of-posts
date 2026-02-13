// import { client } from '../utils/axiosClient';
import { client } from '../utils/fetchClient';
import { PostComment } from '../types/PostComment';

export const getPostComments = (postId: number) => {
  return client.get<PostComment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: Omit<PostComment, 'id'>) => {
  return client.post<PostComment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
