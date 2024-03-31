/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

type InitialState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

type AddCommentsPayload = {
  postId: number;
  commentData: CommentData;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/fetchAdd',
  ({ postId, commentData }: AddCommentsPayload) => {
    return createComment({
      name: commentData.name,
      email: commentData.email,
      body: commentData.body,
      postId,
    });
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearComments: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = 'Something with Comments went wrong!';
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = 'Failed to add comment!';
      });
  },
});

export default commentsSlice.reducer;
export const { deleteComment, clearComments } = commentsSlice.actions;
