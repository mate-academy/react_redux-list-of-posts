/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  creatingComment: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
  creatingComment: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);

      commentsApi.deleteComment(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
