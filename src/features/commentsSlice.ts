/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder, createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { CommentsState } from '../types/CommentsState';

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getComments = createAsyncThunk(
  'comments/get',
  (postId: number) => getPostComments(postId),
);

export const addComments = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    remove: (state, action) => {
      state.items = state.items
        .filter((comment) => comment.id !== action.payload);

      deleteComment(action.payload);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CommentsState>) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });

    builder
      .addCase(addComments.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { clear, remove } = commentsSlice.actions;
export default commentsSlice.reducer;
