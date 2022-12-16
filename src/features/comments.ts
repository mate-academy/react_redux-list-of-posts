/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import type { RootState, AppDispatch } from '../app/store';

export const getPostComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({
    name, email, body, postId,
  }: CommentData) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      getPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );
    builder.addCase(getPostComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );
    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default comments.reducer;
export const { setComments, setLoaded, setError } = comments.actions;

export const deleteComment = (commentId: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setComments(
      getState().comments.items.filter(comment => comment.id !== commentId),
    ));

    await commentsApi.deleteComment(commentId);
  };
};
