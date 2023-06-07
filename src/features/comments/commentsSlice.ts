/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export interface UserPostsState {
  items: Comment[];
  isLoaded: boolean;
  hasError: boolean;
}

const initialState: UserPostsState = {
  items: [],
  isLoaded: true,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action) => {
      const index = state.items.findIndex(({ id }) => id === action.payload);

      state.items.splice(index, 1);
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.isLoaded = true;
        state.hasError = true;
      });
  },
});

export const { addComment, removeComment, setError } = commentsSlice.actions;

export default commentsSlice.reducer;
