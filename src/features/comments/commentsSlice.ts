/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  commentsApi.getPostComments,
);

export const addComment = createAsyncThunk(
  'comments/add',
  commentsApi.createComment,
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  commentsApi.deleteComment,
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    deleteComment: (state, action: { payload: number }) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
