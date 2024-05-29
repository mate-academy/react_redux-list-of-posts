import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  getPostComments,
);

export const addComment = createAsyncThunk('comment/add', createComment);
export const removeComment = createAsyncThunk('comment/delete', deleteComment);
