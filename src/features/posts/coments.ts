/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';

import * as commentsApi from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialStateOfComments: CommentsState = {
  comments: [],
  status: 'idle',
};

export const getCommentsAsync = createAsyncThunk(
  'comments/getComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (
    {
      name, email, body, postId,
    }: { name: string; email: string; body: string; postId: number },
  ) => {
    const response = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return response;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialStateOfComments,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = [...state.comments]
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = 'idle';
    });
    builder.addCase(getCommentsAsync.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getCommentsAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(deleteCommentAsync.rejected, () => {
      // eslint-disable-next-line no-console
      console.log('Error deleting comment:');
    });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
