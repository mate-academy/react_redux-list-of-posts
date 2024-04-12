/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: InitialState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(initPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postSlice.reducer;
export const { set } = postSlice.actions;
