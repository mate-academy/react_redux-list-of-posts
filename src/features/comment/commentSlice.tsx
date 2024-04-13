/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from '../../api/comments'; // Імпорт функцій для роботи з коментарями з вашого API
import { Comment } from '../../types/Comment';
import { RootState } from '../../app/store';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: Comment, thunkAPI) => {
    const response = await createCommentApi(commentData);

    thunkAPI.dispatch(loadComments(commentData.postId));

    return response;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, thunkAPI) => {
    await deleteCommentApi(commentId);
    const state = thunkAPI.getState() as RootState;
    const postId = state.comments.comments.find(
      comment => comment.id === commentId,
    )?.postId;

    if (postId) {
      thunkAPI.dispatch(loadComments(postId));
    }

    return commentId;
  },
);

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoaded = (state: RootState) => state.comments.loaded;
export const selectHasError = (state: RootState) => state.comments.hasError;

export default commentsSlice.reducer;
