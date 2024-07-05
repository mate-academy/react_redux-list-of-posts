/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk('comments/fetch', getPostComments);

export const addComment = createAsyncThunk('comments/add', createComment);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(el => el.id !== action.payload);
    });

    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
