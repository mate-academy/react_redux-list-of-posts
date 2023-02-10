/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const initComments
  = createAsyncThunk('comments/fetch', (postId: number) => {
    return getPostComments(postId);
  });

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(initComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setComments, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
