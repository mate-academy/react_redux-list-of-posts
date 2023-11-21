/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface InitialState {
  comments: Comment[];
  isLoading: boolean;
  error: string;
}

const initialState: InitialState = {
  comments: [],
  isLoading: false,
  error: '',
};

// prettier-ignore
export const init = createAsyncThunk(
  'posts/fetch', (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(({ id }) => id !== action.payload);
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'something went wrong';
      state.isLoading = false;
    });
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
