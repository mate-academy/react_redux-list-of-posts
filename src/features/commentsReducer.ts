/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,

};

export const fetchGetComments = createAsyncThunk(
  'getComments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComFromStore: (
      state: CommentsState,
      action: PayloadAction<number>,
    ) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetComments.pending, (state) => {
        state.loaded = true;
      })
      .addCase(fetchGetComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = false;
      })
      .addCase(fetchGetComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = false;
      });
  },
});

export default commentsSlice.reducer;
export const { createComment, deleteComFromStore } = commentsSlice.actions;
