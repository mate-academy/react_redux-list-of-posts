/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  loaded: false,
  items: [] as Post[],
  hasError: false,
};

export const loadUserPosts = createAsyncThunk<Post[], number>(
  'userPosts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
