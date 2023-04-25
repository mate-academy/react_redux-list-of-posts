import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addCommentAction = createAsyncThunk(
  'comments/add',
  ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => createComment({
    name,
    email,
    body,
    postId,
  }),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (id: number) => {
    deleteComment(id);

    return id;
  },
);
