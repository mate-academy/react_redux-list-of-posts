/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  getPostComments,
);

export const addComment = createAsyncThunk('comment/add', createComment);
export const removeComment = createAsyncThunk('comment/delete', deleteComment);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    delete: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(com => com.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments.filter(com => com.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
