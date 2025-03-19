import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = createAsyncThunk(
  'comments/getPostComments',
  async (postId: number) => {
    const comments = await client.get<Comment[]>(`/comments?postId=${postId}`);

    return comments;
  },
);
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await client.delete(`/comments/${commentId}`);

    return commentId;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (comment: Comment) => {
    const newComment = await client.post<Comment>('/comments', comment);

    return newComment;
  },
);
