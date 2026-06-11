/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: '',
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.hasError = action.payload;
    },
    deleteComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = '';
      state.loaded = true;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadComments.rejected, (state, action) => {
      state.hasError = action.error.message || '';
      state.loaded = false;
    });
  },
});

export default commentsSlice.reducer;
