/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[],
  selectedPost: Post | null,
  loaded: boolean,
  hasError: boolean,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
  status: 'idle',
};

export const loadUserPosts = createAsyncThunk('posts/loadPosts', getUserPosts);

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, (state) => {
      state.posts = [];
      state.loaded = false;
      state.status = 'loading';
    })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(loadUserPosts.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default userPostsSlice.reducer;
export const {
  setSelectedPost,
  clearSelectedPost,
} = userPostsSlice.actions;
