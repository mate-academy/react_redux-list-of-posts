import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async (userId: number): Promise<Post[]> => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loading = true;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, state => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default postSlice.reducer;
