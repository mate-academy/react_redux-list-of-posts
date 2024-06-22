/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  items: Comment[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  isLoading: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) =>
  commentsApi.getPostComments(postId),
);

const comentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment: ({ items }, { payload }: PayloadAction<Comment>) => {
      items.push(payload);
    },
    deleteComment: (state, { payload }: PayloadAction<number>) => {
      state.items = state.items.filter(({ id }) => id !== payload);
      commentsApi.deleteComment(payload);
    },
    setError: (state, { payload }: PayloadAction<boolean>) => {
      state.hasError = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export default comentsSlice.reducer;
export const actions = comentsSlice.actions;
