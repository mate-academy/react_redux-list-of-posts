/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => {
    return getPostComments(postId);
  },
);

type InitialState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: InitialState = {
  loaded: false,
  hasError: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNewComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addNewComment, removeComment } = commentsSlice.actions;
