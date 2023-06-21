import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
