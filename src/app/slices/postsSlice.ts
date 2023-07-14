/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

export interface PostState {
  isLoading: boolean,
  hasError: boolean,
  items: Post[],
}

const initialState: PostState = {
  isLoading: false,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state: PostState) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (
        state: PostState, action: PayloadAction<Post[]>,
      ) => {
        state.isLoading = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: PostState) => {
        state.isLoading = true;
        state.hasError = true;
      });
  },
});
