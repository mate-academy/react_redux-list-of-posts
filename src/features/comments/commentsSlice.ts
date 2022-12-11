/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const initComments = createAsyncThunk('comments/fetch',
  (id: number) => getPostComments(id));

export const addComment = createAsyncThunk('newComment/fetch',
  (data: Omit<Comment, 'id'>) => createComment(data));

export const removeComment = createAsyncThunk('deleteComment/fetch',
  (id: number) => {
    deleteComment(id);

    return id;
  });

type Comments = {
  comments: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: Comments = {
  comments: [],
  loading: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loading = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.hasError = false;
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments
        .filter(item => item.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
