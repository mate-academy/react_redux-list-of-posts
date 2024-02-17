/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as api from '../../api/comments';

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => api.createComment(comment),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => api.deleteComment(commentId),
);

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => api.getPostComments(postId),
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  deletingComment: null as null | Comment,
  comments: [] as Comment[],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDeletingComment: (state, action) => {
      state.deletingComment = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(addComment.rejected, () => {
      throw new Error();
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.comments = state.comments
        .filter(comment => comment.id !== state.deletingComment?.id);
      state.errorMessage = '';
    });

    builder.addCase(deleteComment.rejected, (state) => {
      state.comments = [...state.comments, state.deletingComment as Comment];
      state.deletingComment = null;
      state.errorMessage = 'Unable to delete a todo';
    });

    builder.addCase(deleteComment.fulfilled, (state) => {
      state.deletingComment = null;
      state.errorMessage = '';
    });

    builder.addCase(loadComments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadComments.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Unable to load comments';
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      state.errorMessage = '';
    });
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  setErrorMessage,
  setIsLoading,
  setDeletingComment,
} = commentsSlice.actions;
