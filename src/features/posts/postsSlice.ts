import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadUserPosts } from './postsAPI';

interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

export const loadPostsThunk = createAsyncThunk(
  'posts/loadPostsThunk',
  loadUserPosts,
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    hasError: false,
    loaded: false,
  },
  reducers: {
    setLoaded(state: PostsState, action: PayloadAction<{ loaded: boolean }>) {
      state.loaded = action.payload.loaded;
    },
    setError(state: PostsState, action: PayloadAction<{ hasError: boolean }>) {
      state.hasError = action.payload.hasError;
    },
    setPosts(state: PostsState, action: PayloadAction<{ items: Post[] }>) {
      state.items = action.payload.items;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostsThunk.pending, (state: PostsState) => {
        state.loaded = false;
      })
      .addCase(
        loadPostsThunk.fulfilled,
        (state: PostsState, action: PayloadAction<{ items: Post[] }>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(loadPostsThunk.rejected, (state: PostsState) => {
        state.hasError = true;
      });
  },
});

export const postsReducer = postsSlice.reducer;

export const { setPosts, setLoaded, setError } = postsSlice.actions;
