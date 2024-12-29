/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const commentsApiActions = {
  loadComments: createAsyncThunk('fetch/comments', async (postId: number) =>
    getPostComments(postId),
  ),

  addComment: createAsyncThunk(
    'add/comment',
    async (newComment: Omit<Comment, 'id'>) => createComment(newComment),
  ),

  deleteComment: createAsyncThunk('delete/comment', (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  }),
};

export const { reducer, actions } = createSlice({
  name: 'comments',
  initialState: {
    isLoading: false,
    hasError: false,
    comments: [] as Comment[],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(commentsApiActions.loadComments.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        commentsApiActions.loadComments.fulfilled,
        (state, { payload }: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          state.comments = payload;
        },
      )
      .addCase(commentsApiActions.loadComments.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });

    builder
      .addCase(
        commentsApiActions.addComment.fulfilled,
        (state, { payload }: PayloadAction<Comment>) => {
          state.comments.push(payload);
        },
      )
      .addCase(commentsApiActions.addComment.rejected, state => {
        state.hasError = true;
      });

    builder.addCase(
      commentsApiActions.deleteComment.fulfilled,
      (state, { payload }: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          comment => comment.id !== payload,
        );
      },
    );
  },
});
