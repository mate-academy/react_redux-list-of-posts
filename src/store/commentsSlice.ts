/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostComment } from '../types/Comment';
import { CommentsState } from '../types/CommentsState';

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const res = await fetch(`/comments?postId=${postId}`);

    return (await res.json()) as PostComment[];
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<PostComment[]>) => {
          state.items = action.payload;
          state.loaded = false;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { deleteComment, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
