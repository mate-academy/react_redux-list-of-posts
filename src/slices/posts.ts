import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/load', async () => {
  return getPosts();
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
export const { setLoaded, setError, setItems } = postsSlice.actions;
