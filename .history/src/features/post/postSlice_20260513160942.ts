import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

interface UsersState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: UsersState = {
  items: [],
  loaded: true,
  hasError: false,
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loaded = false;
      state.hasError = 'Something went wrong';
    });
  },
});

export default postSlice.reducer;

export const fetchPosts = createAsyncThunk('users/fetch', async () => {
  const posts = await getUserPosts();

  return posts;
});
