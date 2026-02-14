import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

/* eslint-disable no-param-reassign */
export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
  commentToDelete: Comment | undefined;
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
  commentToDelete: undefined,
};

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      state.comments = state.comments.filter(comment => {
        if (comment.id === action.payload) {
          state.commentToDelete = comment;
        }

        return comment.id !== action.payload;
      });
    },

    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(removeComment.rejected, state => {
      if (state.commentToDelete) {
        state.comments.push(state.commentToDelete);
      }
    });
  },
});
