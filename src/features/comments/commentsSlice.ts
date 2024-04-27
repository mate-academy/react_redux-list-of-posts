/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
// eslint-disable-next-line import/no-cycle

export interface CommentState {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
  submitting: boolean;
}

const initialState: CommentState = {
  loaded: false,
  hasError: false,
  submitting: false,
  comments: [],
};

export const loadCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async ({ name, email, body, postId }: Omit<Comment, 'id'>) => {
    return createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      // Comments Load
      .addCase(loadCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(loadCommentsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      // Comment Add
      .addCase(addCommentAsync.pending, state => {
        state.submitting = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.submitting = false;
      })
      .addCase(addCommentAsync.rejected, state => {
        state.hasError = true;
        state.submitting = false;
      });
  },
});

export const commentsState = (state: RootState) => state.comments;
export const { removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
