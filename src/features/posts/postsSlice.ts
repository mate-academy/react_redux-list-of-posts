/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  posts: [] as Post[],
  hasError: false,
  loaded: true,
};

export const setPosts = createAsyncThunk('posts/set', (userId: number) => {
  return getUserPosts(userId);
});

export const postSLice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsNull: state => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(setPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(setPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setPostsNull } = postSLice.actions;
export default postSLice.reducer;
