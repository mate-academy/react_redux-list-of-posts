/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
    error: (state, action: PayloadAction<string>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = '';
    });
    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );
    builder.addCase(init.rejected, (state, action) => {
      state.hasError = action.error.message || '';
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { create, remove, error } = commentsSlice.actions;
