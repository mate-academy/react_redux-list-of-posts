/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const getPostsForUser = createAsyncThunk(
  'author/fetch',
  (userId: number) => getUserPosts(userId),
);

type InitialState = {
  author: User | undefined;
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
};
const initialValue: InitialState = {
  author: undefined,
  loaded: false,
  hasError: false,
  posts: [],
};

const authorSlice = createSlice({
  name: 'author',
  initialState: initialValue,
  reducers: {
    setAuthor: (state, actions) => {
      state.author = actions.payload;
    },

    clearAuthor: state => {
      state.author = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPostsForUser.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(getPostsForUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(getPostsForUser.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
