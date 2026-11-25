/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
  submiting: boolean;
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
  submiting: false,
};

export const getComments = createAsyncThunk(
  'comments/fetchCommnts',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'newComment/fetchNewComment',
  async (data: CommentData) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'removeComment/fetchRemoveComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(getComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, state => {
        state.submiting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.submiting = false;
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.submiting = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      });
  },
});

export const commentsActions = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
