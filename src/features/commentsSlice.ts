/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.loaded = true;
      state.hasError = false;
      state.items = payload;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setComments, addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
