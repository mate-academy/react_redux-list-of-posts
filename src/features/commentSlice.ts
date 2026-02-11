/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

// Fetch comments dla konkretnego posta
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    return response.json() as Promise<Comment[]>;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.unshift(action.payload); // dodajemy na początek listy
      state.loaded = true; // zaznaczamy, że lista jest załadowana
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { clearComments, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
