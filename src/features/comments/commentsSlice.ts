/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommetsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommetsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const importCommentsAsync = createAsyncThunk(
  'comments/fetch',
  async (selectedPostId: number) => {
    const postComments = await getPostComments(selectedPostId);

    return postComments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(importCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(importCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(importCommentsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment } = commentsSlice.actions;
