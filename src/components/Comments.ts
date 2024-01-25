/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const fetchComments
= createAsyncThunk('comments/fetch', async (postId: number) => {
  const response = await getPostComments(postId);

  return response;
});

export interface InitialStoreComments {
  value: Comment[];
  isLoading: boolean;
  error: boolean;
}

const initialState: InitialStoreComments = {
  value: [],
  isLoading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action:PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    set: (state, action: PayloadAction<Comment[]>) => {
      state.error = false;
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default commentsSlice.reducer;
