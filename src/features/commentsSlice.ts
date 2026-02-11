/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

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

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, { payload }: PayloadAction<Comment>) => {
      state.comments.push(payload);
    },
    deleteComment: (state, { payload }: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== payload);
    },
    setCommentsError: (state, { payload }: PayloadAction<boolean>) => {
      state.hasError = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(
      loadComments.fulfilled,
      (state, { payload }: PayloadAction<Comment[]>) => {
        state.comments = payload;
        state.loaded = true;
      },
    );
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, setCommentsError } =
  commentsSlice.actions;
