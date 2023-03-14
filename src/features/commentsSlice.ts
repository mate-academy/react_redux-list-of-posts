/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean,
  hasError: boolean,
  comments: Comment[],
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const setComments = createAsyncThunk(
  'comments/getPostComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(setComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.hasError = false;
      state.loaded = true;
    });

    builder.addCase(setComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { add, remove } = commentsSlice.actions;

export default commentsSlice.reducer;
