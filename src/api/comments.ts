// import { client } from '../utils/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = createAsyncThunk(
  'fetchPostComments',
  async (postId: number) => client.get<Comment[]>(`/comments?postId=${postId}`),
);

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteCommentApi = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
