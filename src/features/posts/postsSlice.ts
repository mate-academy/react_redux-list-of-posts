import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  loaded: boolean;
  hasError: string;
  items: Post[];
};

const initialState: PostState = {
  loaded: false,
  hasError: '',
  items: [],
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = '';
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(initPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = 'Something went wrong';
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
