/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const uploadComments = createAsyncThunk(
  'comments/fetchComments',
  async (id: number) => {
    const value = await getPostComments(id);

    return value;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(uploadComments.rejected, (state) => {
        state.error = 'Error';
      });
  },
});

export default commentsSlice.reducer;
