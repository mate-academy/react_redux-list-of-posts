/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  addCommentAsync,
  deleteCommentAsync,
  initComments,
} from './commetThunk';

interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        (state.loaded = false);
        (state.hasError = false);
      })
      .addCase(initComments.fulfilled, (state, action) => {
        (state.loaded = true);
        (state.items = action.payload);
      })
      .addCase(initComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCommentAsync.pending, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

export default commentSlice.reducer;
