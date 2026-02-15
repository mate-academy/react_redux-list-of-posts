import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

/* eslint-disable @typescript-eslint/indent */
export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/add', async commentData => {
  return createComment(commentData);
});

export const deleteCommentThunk = createAsyncThunk<number, number>(
  'comments/delete',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);
