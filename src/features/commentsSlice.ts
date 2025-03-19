/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  // Export the state type
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getPostComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
