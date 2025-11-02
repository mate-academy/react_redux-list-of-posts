/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';
import {
  getPostComments,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from '../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  errorMessage: string | null;
  visible: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  errorMessage: null,
  visible: false,
};

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createCommentApi(data);

    return response;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteCommentApi(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = true;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { setVisible } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;
export const selectCommentsErrorMessage = (state: RootState) =>
  state.comments.errorMessage ?? null;
export const selectCommentsVisible = (state: RootState) =>
  state.comments.visible;

export default commentsSlice.reducer;
