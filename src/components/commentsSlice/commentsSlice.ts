/* eslint-disable no-param-reassign */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    removeAllComments: state => {
      state.comments = [];
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { addComment, removeComment, removeAllComments } =
  commentsSlice.actions;

export default commentsSlice.reducer;
