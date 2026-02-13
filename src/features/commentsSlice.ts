/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewComment, Comment } from '../types/Comment';
import { createComment } from '../utils/fetchClient'; // Import createComment directly

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: NewComment) => {
    const response = await createComment(comment);

    return response;
  },
);

interface CommentsState {
  items: Comment[];
  loading: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addComment.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addComment.rejected, state => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
