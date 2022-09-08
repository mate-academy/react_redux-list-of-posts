import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

interface CommentsState {
  comments: Comment[],
  loaded: boolean,
  hasError: null | string,
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: null,
};

export const fetchCommentsByPostId = createAsyncThunk<Comment[], number>(
  'commentsState/fetchCommentsByPostId',
  getPostComments,
);

export const postsSlice = createSlice({
  name: 'commentsState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.hasError = action.error?.message || null;
        state.loaded = true;
      });
  },
});

export const selectComments = (state: RootState) => state.commentsState;

export default postsSlice.reducer;
