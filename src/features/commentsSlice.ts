/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

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

export const loadComments = createAsyncThunk('comments/load', getPostComments);

export const addNewComments = createAsyncThunk('comments/add', createComment);

export const deleteComments = createAsyncThunk('comments/delete',
  deleteComment);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, (state => {
      state.loaded = false;
    }));

    builder.addCase(loadComments.fulfilled,
      ((state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      }));

    builder.addCase(loadComments.rejected, ((state) => {
      state.hasError = true;
      state.loaded = true;
    }));

    builder.addCase(addNewComments.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      });

    builder.addCase(addNewComments.rejected, ((state) => {
      state.hasError = true;
    }));

    builder.addCase(deleteComments.pending,
      ((state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      }));

    builder.addCase(deleteComments.rejected, ((state) => {
      state.hasError = true;
    }));
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
