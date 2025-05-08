import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import { wait } from '../utils/fetchClient';

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  errorMessage: string;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  errorMessage: '',
};

export const init = createAsyncThunk(
  'comments/fetchComments',
  async (userId: number) => {
    await wait(2000);

    return getPostComments(userId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.errorMessage = 'error';
    });
  },
});

export default commentsSlice.reducer;
