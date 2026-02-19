import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk<Post[], number>(
  'posts/load',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state: PostsState) {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
