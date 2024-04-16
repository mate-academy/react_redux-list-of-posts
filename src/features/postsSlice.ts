/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(userPosts.pending, state => {
      state.loading = true;
    });
    builder.addCase(userPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(userPosts.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;

export const userPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});
