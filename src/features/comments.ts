/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadComments.rejected, state => {
      state.loaded = false;
      state.hasError = false;
    });
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
