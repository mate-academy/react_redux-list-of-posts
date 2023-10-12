import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsAPI from '../../api/comments';

export const loadComments = createAsyncThunk(
  'comments/fetch', (id: number) => {
    return commentsAPI.getPostComments(id);
  },
);

export const postComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return commentsAPI.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comment/delete',
  (commentId: number) => {
    return commentsAPI.deleteComment(commentId);
  },
);
