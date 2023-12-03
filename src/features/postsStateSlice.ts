import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

interface PostsState {
  posts: Post[],
  loaded: boolean,
  error: null | string,
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  error: null,
};

export const fetchPostsByUserId = createAsyncThunk<Post[], number>(
  'postState/fetchPosts',
  getUserPosts,
);

export const postsSlice = createSlice({
  name: 'postsState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loaded = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.postsState;

export default postsSlice.reducer;
