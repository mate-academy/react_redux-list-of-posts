/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';
import type { RootState } from '../../app/store';

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
  'comments/fetch',
  async (postId: number) => {
    const comments = commentsApi.getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comment/fetch_add',
  async (data: Omit<Comment, 'id'>) => {
    const addedComment = commentsApi.createComment(data);

    return addedComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comment/fetch_delete',
  async (commentId: number) => {
    const deletedComment = commentsApi.deleteComment(commentId);

    return deletedComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, { payload: commentId }: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== commentId
      ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state => {
      state.loaded = false;
      state.hasError = false;
    }));
    builder.addCase(fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.comments = action.payload;
      });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      });
    builder.addCase(addComment.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const { removeComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
