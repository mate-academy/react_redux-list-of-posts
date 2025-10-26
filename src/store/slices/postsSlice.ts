/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostType = {
  posts: Post[];
  loaded: boolean;
  error: string;
};

const initialState: PostType = {
  posts: [] as Post[],
  loaded: false,
  error: '',
};

export const init = createAsyncThunk('posts/init', (id: number) => {
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
      state.error = '';
      state.posts = [];
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.error = 'Failed to loading posts';
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
