/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentSlice = {
  items: Comment[] | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentSlice = {
  items: null,
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
    loaded: (state, action) => {
      state.loaded = action.payload;
    },
    hasCommentError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(initComments.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export const { loaded, hasCommentError, setComments } = commentSlice.actions;

export default commentSlice.reducer;
