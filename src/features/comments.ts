/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export interface UserPostsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserPostsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      const index = state.comments.findIndex(({ id }) => id === action.payload);

      state.comments.splice(index, 1);
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { addComment, removeComment, setError } = commentsSlice.actions;

export default commentsSlice.reducer;
