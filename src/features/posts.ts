import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type Init = {
  loaded: boolean;
  posts: Post[];
  hasError: boolean;
};

const initialState: Init = {
  loaded: false,
  posts: [],
  hasError: false,
};

export const setPosts = createAsyncThunk('fetch/posts', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    cleanPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(setPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(
      setPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.posts = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      },
    );

    builder.addCase(setPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { cleanPosts } = postsSlice.actions;
