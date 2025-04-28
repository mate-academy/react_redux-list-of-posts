/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

interface PostsState {
  posts: Post[] | [];
  loaded: boolean;
  hasError: boolean;
}
const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[] | []>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { set } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
