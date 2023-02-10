/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

interface CommentsState {
  loaded: boolean
  hasError: boolean
  items: Comment[]
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    removeComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
