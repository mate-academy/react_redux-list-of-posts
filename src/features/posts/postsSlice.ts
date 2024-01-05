import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

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

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  (userId: number): Promise<Post[]> => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];// eslint-disable-line no-param-reassign
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = false;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.items = action.payload;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.hasError = true;// eslint-disable-line no-param-reassign
      });
  },
});

export const { clean } = postsSlice.actions;
export default postsSlice.reducer;
