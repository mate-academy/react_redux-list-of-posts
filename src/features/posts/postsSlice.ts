/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number): Promise<Post[]> => {
    const posts: Post[] = await getUserPosts(userId);

    return posts;
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (_, action) => {
      return action.payload;
    },
    clear: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postSlice.reducer;
export const { set, clear } = postSlice.actions;
