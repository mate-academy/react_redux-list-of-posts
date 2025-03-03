/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  buttonLoading: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
  buttonLoading: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteStateComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload;
        },
      )
      .addCase(initComments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          `Error comments: ${action.error?.message}` || 'Something went wrong';
      })
      .addCase(addComment.pending, state => {
        state.buttonLoading = true;
        state.error = null;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.buttonLoading = false;
          state.error = null;
          state.comments.push(action.payload);
        },
      )
      .addCase(addComment.rejected, (state, action) => {
        state.buttonLoading = false;
        state.error =
          `Error comments: ${action.error?.message}` || 'Something went wrong';
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.error =
          `Error comments: ${action.error?.message}` || 'Something went wrong';
      });
  },
});

export const { deleteStateComment } = commentsSlice.actions;
