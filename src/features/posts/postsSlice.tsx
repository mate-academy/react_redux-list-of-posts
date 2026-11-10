import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadPosts } from './postsThunk';

type PostsState = {
  value: Post[];
  status: 'idle' | 'loading' | 'loaded' | 'failed';
};

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        /* eslint-disable no-param-reassign */
        state.status = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.value = action.payload;
      })
      .addCase(loadPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default postsSlice.reducer;
