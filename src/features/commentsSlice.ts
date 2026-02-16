/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type State = {
  error: string;
  loading: boolean;

  comments: Comment[];
};

const initialState: State = {
  error: '',
  loading: false,

  comments: [],
};

export const loadComments = createAsyncThunk(
  'comments/loadPosts',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    take: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.comments = [...action.payload];
      },
    );

    builder.addCase(loadComments.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default commentsSlice.reducer;
export const { add, take } = commentsSlice.actions;
