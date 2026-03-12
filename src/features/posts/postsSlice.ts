import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

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

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    clearPosts: state => {
      const nextState = state;

      nextState.items = [];
      nextState.loaded = false;
      nextState.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        const nextState = state;

        nextState.loaded = false;
        nextState.hasError = false;
        nextState.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const nextState = state;

        nextState.loaded = true;
        nextState.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        const nextState = state;

        nextState.loaded = true;
        nextState.hasError = true;
      });
  },
});
export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
