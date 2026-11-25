import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const initComments = createAsyncThunk(
  'comments/init',
  async (postId: number): Promise<Comment[]> => {
    return getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>): Promise<Comment> => {
    return createComment(data);
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comment/delete',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);
