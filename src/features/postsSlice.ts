/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { createCommentAsync } from './commentsSlice';
import { RootState } from '../app/store';

type PostsSlice = {
  items: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsSlice = {
  items: [],
  isLoading: false,
  hasError: false,
};

export const loadPostsAsync = createAsyncThunk(
  'posts/load',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPostsAsync.pending, (state: PostsSlice) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      loadPostsAsync.fulfilled,
      (state: PostsSlice, { payload }: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.items = payload;
      },
    );
    builder.addCase(loadPostsAsync.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(createCommentAsync.rejected, state => {
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
