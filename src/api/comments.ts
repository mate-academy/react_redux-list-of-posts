// import { client } from '../utils/axiosClient';
import { client } from '../utils/fetchClient';
import {
  Comment as CustomComment,
  CommentData as CustomCommentData,
} from '../types/Comment';

export const getPostComments = (postId: number): Promise<CustomComment[]> => {
  return client.get<CustomComment[]>(`/comments?postId=${postId}`);
};

export const createComment = (
  data: CustomCommentData,
): Promise<CustomComment> => {
  return client.post<CustomComment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
