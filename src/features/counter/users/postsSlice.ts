/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

// 4. Сам слайс постов
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
      state.selectedPost = null; // сбрасываем пост при смене автора
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(initPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts, setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
