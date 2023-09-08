/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  hasError: boolean,
  loaded: boolean,
}

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (
      state: CommentsState,
      action: PayloadAction<Comment>,
    ) => {
      state.items.push(action.payload);
    },

    removeComment: (
      state: CommentsState,
      action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },

    clearComments: (
      state: CommentsState,
    ) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (
        state: CommentsState,
        action: PayloadAction<Comment[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const {
  addComment,
  removeComment,
  clearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
