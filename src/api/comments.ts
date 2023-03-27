// import { client } from '../utils/axiosClient';
import { client } from '../utils/fetchClient';
import { IComment, ICommentData } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<IComment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: ICommentData) => {
  return client.post<IComment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
