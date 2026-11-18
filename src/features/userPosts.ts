import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type UserPostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UserPostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const data = await getUserPosts(userId);

    return data;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchUserPosts.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchUserPosts.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export const userPostsReducer = postsSlice.reducer;
