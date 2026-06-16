import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
} as CommentsState;

export const init = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({
    postId,
    name,
    email,
    body,
  }: {
    postId: number;
    name: string;
    email: string;
    body: string;
  }) => {
    return createComment({
      postId,
      name,
      email,
      body,
    });
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: state => ({ ...state, error: null }),
  },
  extraReducers: builder =>
    builder
      .addCase(init.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(init.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(init.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))

      .addCase(addComment.pending, state => ({ ...state, hasError: false }))
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))

      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }))
      .addCase(removeComment.rejected, state => ({
        ...state,
        hasError: true,
      })),
});

export const { clearError } = commentsSlice.actions;
