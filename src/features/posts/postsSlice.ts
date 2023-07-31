/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

interface PostsState {
  posts: Post[],
  loading: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  hasError: false,
};

export const init = createAsyncThunk('userPosts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
