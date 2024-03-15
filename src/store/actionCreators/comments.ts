import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  },
);

export const createCommentAction = createAsyncThunk(
  'comments/create',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

export const deleteCommentAction = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);
