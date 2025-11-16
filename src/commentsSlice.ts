/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment } from './api/comments';
import { Comment } from './types/Comment';

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => getPostComments(postId),
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async ({
    postId,
    body,
    email,
  }: {
    postId: number;
    body: string;
    email: string;
  }) => {
    return createComment({
      postId,
      body,
      email,
      name: '',
    });
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  visible: true,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleVisible: state => {
      state.visible = !state.visible;
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { toggleVisible, clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
