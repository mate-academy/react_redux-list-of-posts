import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export const commentsAsync = {
  fetchComments: createAsyncThunk('comments/Fetch comments',
    async (id: number) => {
      const response = await getPostComments(id);

      return response;
    }),
  deleteComment: createAsyncThunk('comments/Delete comment',
    (id: number) => {
      commentsApi.deleteComment(id);

      return id;
    }),
  addComment: createAsyncThunk('comments/Add comment',
    async (data: Omit<Comment, 'id'>) => {
      const response = await commentsApi.createComment(data);

      return response;
    }),
};
