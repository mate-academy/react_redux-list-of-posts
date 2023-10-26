import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsAPI from '../api/comments';

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return commentsAPI.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return commentsAPI.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsAPI.deleteComment(commentId);
  },
);
