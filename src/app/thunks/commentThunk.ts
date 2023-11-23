import { createAsyncThunk } from '@reduxjs/toolkit';
import * as commentApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch', (postId: number) => {
    return commentApi.getPostComments(postId);
  },
);

export const addComments = createAsyncThunk(
  'comments/add', (data: Omit<Comment, 'id'>) => {
    return commentApi.createComment(data);
  },
);

export const deleteComments = createAsyncThunk(
  'comments/delete', (commentId: number) => {
    return commentApi.deleteComment(commentId);
  },
);
