import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: string;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchCommentsByPost = createAsyncThunk<Comment[], number>(
  'comments/fetchCommentsByPost',
  async postId => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

/* eslint-disable no-param-reassign */
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = '';
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error loading comments';
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
