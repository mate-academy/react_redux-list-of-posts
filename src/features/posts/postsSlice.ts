/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  posts: [],
  loaded: true,
  hasError: false,
};

export const setPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(setPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(setPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { set } = postsSlice.actions;
export default postsSlice.reducer;
