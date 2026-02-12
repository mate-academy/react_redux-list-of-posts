/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from './postsAPI';

export interface PostsState {
  posts: Post[] | [];
  postsLoaded: boolean;
  postsError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  postsLoaded: false,
  postsError: false,
  selectedPost: null,
};

export const init = createAsyncThunk(
  'posts/getUserPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, (state: PostsState) => {
        state.postsLoaded = false;
        state.postsError = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.postsLoaded = true;
        state.posts = action.payload;
      })
      .addCase(init.rejected, (state: PostsState) => {
        state.postsLoaded = false;
        state.postsError = true;
      });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
