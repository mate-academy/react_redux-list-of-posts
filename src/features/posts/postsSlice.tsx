/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { set } = postSlice.actions;

export default postSlice.reducer;
