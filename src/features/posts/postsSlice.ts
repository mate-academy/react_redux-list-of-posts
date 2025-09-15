import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export type PostsState = {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: PostsState = {
  items: [],
  hasError: false,
  loaded: true,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

/* eslint-disable no-param-reassign */
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPostsList: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { clearPostsList } = postsSlice.actions;

export default postsSlice.reducer;
