/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { commentCreate, commentDelete } from './newCommentFormSlice';

type CommetsFromServer = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

export const initialState: CommetsFromServer = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsFetch = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    let previousState: Comment[] = [];

    builder.addCase(commentsFetch.pending, state => {
      state.loaded = false;
    });
    builder.addCase(commentsFetch.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(commentsFetch.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(commentCreate.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.hasError = false;
    });
    builder.addCase(commentCreate.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(commentDelete.pending, (state, action) => {
      previousState = JSON.parse(JSON.stringify(state.comments));
      state.comments = state.comments.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
    builder.addCase(commentDelete.rejected, state => {
      state.comments = previousState;
    });
    builder.addCase(commentDelete.fulfilled, () => {
      previousState = [];
    });
  },
});

export default commentsSlice.reducer;
