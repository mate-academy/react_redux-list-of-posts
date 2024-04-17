/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(userPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(userPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(userPosts.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;

export const userPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});
