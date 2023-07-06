/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const getCommentsAsync = createAsyncThunk(
  'getComments/fetch', (id: number) => {
    return getPostComments(id);
  },
);

export const createCommentsAsync = createAsyncThunk(
  'createComments/fetch', (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteCommentsAsync = createAsyncThunk(
  'deleteComments/fetch', (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments
      = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
    builder
      .addCase(createCommentsAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(createCommentsAsync.rejected, (state) => {
        state.hasError = true;
      });
    builder.addCase(deleteCommentsAsync.fulfilled, (state, action) => {
      state.comments
      = state.comments.filter(comment => comment.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
