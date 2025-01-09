/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

//export const init = createAsyncThunk('users/fetch', () => getPosts());

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

type InitialStateType = {
  posts: Post[];
  loaded: boolean;
  error: boolean;
};

const initialState: InitialStateType = {
  posts: [],
  loaded: true,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      return { ...state, posts: [] };
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
      state.loaded = true;
      state.error = true;
    });
  },
});

export default postsSlice.reducer;

export const { clear } = postsSlice.actions;
