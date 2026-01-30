import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getComments } from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getComments(postId);
  },
);

interface CommentsState {
  items: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  items: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default commentsSlice.reducer;
