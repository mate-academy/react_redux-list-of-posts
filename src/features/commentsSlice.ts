/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) =>
  getPostComments(postId),
);

export const add = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.items = [];
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(add.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { remove } = commentsSlice.actions;

export default commentsSlice.reducer;
