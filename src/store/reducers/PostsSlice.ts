/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../actionCreators/posts';
import { Post } from '../../types/Post';

interface PostsSliceState {
  posts: Post[] |[];
  isLoading: boolean;
  error: boolean;
}

const initialState: PostsSliceState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => {
      return { ...initialState };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.isLoading = true;
        state.error = false;
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.error = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.isLoading = false;
        state.error = true;
        state.posts = [];
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
