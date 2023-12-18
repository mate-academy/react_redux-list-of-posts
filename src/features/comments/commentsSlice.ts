/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
} from '../../api/comments';

import { Comment } from '../../types';

export interface PostCommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: PostCommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const items = await getPostComments(postId);

    return items;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(
        fetchPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
          state.hasError = false;
        },
      )
      .addCase(fetchPostComments.rejected, (state) => {
        state.loaded = true;
        state.items = [];
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { addComment, removeComment } = commentsSlice.actions;
