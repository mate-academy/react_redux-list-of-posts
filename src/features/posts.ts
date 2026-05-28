import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPost',
  (userId: number) => getUserPosts(userId),
);

const postReducer = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state: PostState) => {
      state.loaded = false;
      state.items = [];
      state.hasError = '';
    });

    builder.addCase(fetchPosts.fulfilled, (state: PostState, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state: PostState) => {
      state.loaded = true;
      state.hasError = 'Пост відсутній';
    });
  },
});

export default postReducer.reducer;
