/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface PostsState {
  comments: Comment[];
  loading: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  comments: [],
  loading: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment(data);

    return newComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );

      commentsApi.deleteComment(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.hasError = false;
        state.comments = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });

    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
