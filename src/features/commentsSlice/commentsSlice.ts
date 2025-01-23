/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommentState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'loadComments/fetch',
  getPostComments,
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, { payload }: PayloadAction<Comment>) => {
      state.comments.push(payload);
    },
    deleteComment: (state, { payload }: PayloadAction<number>) => {
      state.comments.filter(({ id }) => id !== payload);
    },
    setCommentsError: (state, { payload }: PayloadAction<boolean>) => {
      state.hasError = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addComment, deleteComment, setCommentsError } =
  commentSlice.actions;
export default commentSlice.reducer;
