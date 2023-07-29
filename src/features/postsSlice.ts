/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { StatusType } from '../types/Status';

export interface PostsState {
  posts: Post[];
  status: StatusType;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  status: StatusType.idle,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/SET',
  async (userId: number) => {
    const loadedposts = await getUserPosts(userId);

    return loadedposts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    clearPosts(state) {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = StatusType.loading;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = StatusType.idle;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = StatusType.failed;
        state.hasError = true;
      });
  },
});

export const { clearPosts, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
