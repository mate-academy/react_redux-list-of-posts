import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostsByUser = createAsyncThunk(
  'posts/loadPostsByUser',
  (userId: number) => getUserPosts(userId),
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostsByUser.pending, state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadPostsByUser.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
      state.hasError = false;
    });
    builder.addCase(loadPostsByUser.rejected, state => {
      state.loaded = true;
      state.hasError = true;
      state.items = [];
    });
  },
});

export default postSlice.reducer;
export const { clearPosts } = postSlice.actions;
