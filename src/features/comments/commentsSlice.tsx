/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { setComments } from './commentsAPI';

export interface CommentsState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

export const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommentToState: (state, { payload }) => {
      state.items.push(payload);
    },
    removeCommentFromState: (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(setComments.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.items = payload;
      })
      .addCase(setComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;

export const { addCommentToState, removeCommentFromState }
  = commentsSlice.actions;
