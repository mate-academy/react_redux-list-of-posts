import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line max-len
import { createComment, deleteComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => (getPostComments(postId)),
);

export const addComments = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => (createComment(data)),
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  (commentId: number) => (deleteComment(commentId)),
);
