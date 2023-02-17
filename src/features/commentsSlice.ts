/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as ApiComments from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

export interface CommentsState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const initComments = createAsyncThunk('comments/fetch', (post: Post) => {
  return ApiComments.getPostComments(post.id);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    onHasError: (state) => {
      state.hasError = true;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.hasError = false;
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { add, onHasError, remove } = commentsSlice.actions;
