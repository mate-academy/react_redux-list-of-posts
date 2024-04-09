/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentApi from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await commentApi.getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await commentApi.createComment(data);

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentApi.deleteComment(commentId);

    return commentId;
  },
);

let deletedComment: Comment | null = null;

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    hideComment: (state, action: PayloadAction<number>) => {
      deletedComment =
        state.comments.find(comment => comment.id === action.payload) || null;

      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    unhideComment: state => {
      if (deletedComment) {
        state.comments.push(deletedComment);

        deletedComment = null;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { hideComment, unhideComment } = commentsSlice.actions;

export default commentsSlice.reducer;
