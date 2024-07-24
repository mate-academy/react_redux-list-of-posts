/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';
import { Post } from '../../types/Post';
import { getPosts } from '../../api/posts';

export interface PostsState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

export const AsyncGetPosts = createAsyncThunk(
  'posts/getPosts',
  async (id: number) => {
    const value = await getPosts().then(data => data);

    return value.filter(elem => elem.userId === id);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AsyncGetPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(AsyncGetPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(AsyncGetPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

// export const { } = counterSlice.actions;

export default postsSlice.reducer;
