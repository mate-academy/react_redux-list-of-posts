/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: '',
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = 'Something went wrong...';
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
