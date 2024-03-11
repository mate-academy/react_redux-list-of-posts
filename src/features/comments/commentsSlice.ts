/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const fetchPosts = createAsyncThunk(
  'comments/fetch',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  },
);

type State = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: State = {
  comments: [],
  loading: false,
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export const selectCommments = (state: RootState) => state.comments.comments;
export const selectLoader = (state: RootState) => state.comments.loading;
export const selectError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;
