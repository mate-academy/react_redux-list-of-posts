/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: string;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: '',
  items: [],
};

export const featchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(el => el.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(featchComments.pending, state => {
        state.loaded = false;
      })
      .addCase(
        featchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(featchComments.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error';
      });
  },
});

export const { add, remove } = commentsSlice.actions;
export default commentsSlice.reducer;
