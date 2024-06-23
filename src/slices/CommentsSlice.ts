/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
  visible: false;
  submitting: boolean;
  deleteCommentId: number | null;
}

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: '',
  visible: false,
  submitting: false,
  deleteCommentId: null,
};

export const initComments = createAsyncThunk(
  'comments/FETCH',
  (postId: number) => getPostComments(postId),
);

export const initNewComment = createAsyncThunk(
  'newComment/FETCH',
  (newComment: Omit<Comment, 'id'>) => createComment(newComment),
);

export const initDeleteComment = createAsyncThunk(
  'deleteComment/FETCH',
  (commentId: number) => deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, actions) => {
      state.visible = actions.payload;
    },

    setDeleteId: (state, actions) => {
      state.deleteCommentId = actions.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, actions) => {
      state.comments = actions.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, state => {
      state.loaded = true;
    });

    builder.addCase(initNewComment.pending, state => {
      state.submitting = true;
    });

    builder.addCase(initNewComment.fulfilled, (state, actions) => {
      state.comments.push(actions.payload);
      state.submitting = false;
    });

    builder.addCase(initNewComment.rejected, state => {
      state.submitting = false;
      state.hasError = 'error with add comment';
    });

    builder.addCase(initDeleteComment.fulfilled, state => {
      state.comments = state.comments.filter(
        comment => comment.id !== state.deleteCommentId,
      );

      state.deleteCommentId = null;
    });
  },
});

export const selectComments = (state: RootState) => state.comments;

export const { setVisible, setDeleteId } = commentsSlice.actions;

export default commentsSlice.reducer;
