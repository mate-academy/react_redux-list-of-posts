import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialType = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'fetch/posts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

/* eslint-disable no-param-reassign */
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
      state.loaded = true;
      state.hasError = false;
    },
  },
  extraReducers(builder) {

    builder.addCase(fetchPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
