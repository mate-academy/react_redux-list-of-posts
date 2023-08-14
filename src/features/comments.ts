/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  submitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  submitting: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData) => commentsApi.createComment(data),
);

export const deleteCommentOnServer = createAsyncThunk(
  'comments/delete',
  (commentId: number) => commentsApi.deleteComment(commentId),
  // async (commentId: number, thunkAPI) => {
  //   const state: RootState = thunkAPI.getState();
  //   const currentComments: Comment[] = state.comments.comments;

  //   await commentsApi.deleteComment(commentId);

  //   return currentComments;
  // },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    clear: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.pending, (state) => {
      state.hasError = false;
      state.submitting = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.submitting = false;
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
      state.submitting = false;
    });

    builder.addCase(deleteCommentOnServer.pending, (state) => {
      state.hasError = false;
    });

    // builder.addCase(deleteComment.fulfilled, (state, action) => {
    //   state.comments = state.comments.filter(
    //     comment => comment.id !== action.payload,
    //   );
    // });

    builder.addCase(deleteCommentOnServer.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { clear, deleteComment } = commentsSlice.actions;
