import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchPostsByUser = createAsyncThunk<Post[], number>(
  'posts/fetchPostsByUser',
  async userId => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

/* eslint-disable no-param-reassign */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = '';
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error loading posts';
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
