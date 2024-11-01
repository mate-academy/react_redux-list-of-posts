import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    const addedComment = await createComment(newComment);

    return addedComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);
