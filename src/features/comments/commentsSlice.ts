/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async postId => {
    const response = await commentsApi.getPostComments(postId);

    return response;
  },
);

export const addComment = createAsyncThunk<
  Comment,
  { postId: number; data: CommentData }
>('comments/addComment', async ({ postId, data }) => {
  const response = await commentsApi.createComment({ ...data, postId });

  return response;
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async commentId => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
