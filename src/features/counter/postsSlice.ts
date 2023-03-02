/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const loadUsersPosts
  = createAsyncThunk('posts/fetch', (authorId: number) => {
    return getUserPosts(authorId);
  });

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsersPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(loadUsersPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.posts = action.payload;
    });

    builder.addCase(loadUsersPosts.rejected, (state) => {
      state.hasError = true;
      state.posts = [];
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { set } = postsSlice.actions;
