/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type InitialState = {
  comments: Comment[],
  loaded: boolean,
  hasError: string,
  addCommentError: boolean,
};

const initialState: InitialState = {
  comments: [],
  loaded: false,
  hasError: '',
  addCommentError: false,
};

export const fetchComments = createAsyncThunk('comments/fetch',
  (postId: number) => getPostComments(postId));

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    addCommentError: (state, action) => {
      state.addCommentError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = 'Something went wrong';
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
