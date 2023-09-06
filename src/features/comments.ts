/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const getComments = createAsyncThunk(
  'comments/get',
  (postId: number) => getPostComments(postId),
);

export const addComments = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);

      deleteComment(action.payload);
    },
    clear: (state) => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(getComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });

    builder.addCase(addComments.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  },
});

export const { remove, clear } = commentsSlice.actions;
export default commentsSlice.reducer;
