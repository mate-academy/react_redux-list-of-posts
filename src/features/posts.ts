import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  loaded: boolean;
  hasError: string;
  items: Post[];
};

const initialState: InitialState = {
  loaded: true,
  hasError: '',
  items: [],
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = 'Error';
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
  },
});

export default postsSlice.reducer;
