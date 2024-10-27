import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return await getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, 'id'>) => {
    return await createComment(newComment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);
