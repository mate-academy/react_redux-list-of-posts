/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts, getUserPosts } from '../../api/posts';

interface InitialStateType {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: InitialStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getUserPostsFromServer = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const getPostsFromServer = createAsyncThunk(
  'posts/getPosts',
  async () => {
    const value = await getPosts();

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsFromServer.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getPostsFromServer.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getPostsFromServer.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;

export type { InitialStateType };

export default postsSlice.reducer;
