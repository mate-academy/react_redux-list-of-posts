/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostComment } from '../types/PostComment';
import { getPostComments } from '../api/comments';

type State = {
  items: [] | PostComment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    addNewComment: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(loadComments.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { deleteComment, addNewComment } = commentsSlice.actions;

export default commentsSlice.reducer;
