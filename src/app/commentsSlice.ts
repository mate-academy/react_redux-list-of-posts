import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loading: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: '',
};

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number): Promise<Comment[]> => {
    const response = await getPostComments(postId);

    return response;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loading = true;
        state.hasError = '';
        state.items = [];
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.hasError = '';
      })
      .addCase(loadComments.rejected, state => {
        state.loading = false;
        state.hasError = 'Something were wrong!';
      });
  },
});

export default commentsSlice.reducer;
