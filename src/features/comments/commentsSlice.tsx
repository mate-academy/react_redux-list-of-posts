/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as API from '../../api/comments';

export type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );

      API.deleteComment(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { set, remove } = commentSlice.actions;

export default commentSlice.reducer;
