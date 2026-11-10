import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadUserPosts } from './userPostsThunk';

type PostsState = {
  items: Post[];
  loadedUserIds: number[];
  status: 'idle' | 'loading' | 'loaded' | 'failed';
};

const initialState: PostsState = {
  items: [],
  loadedUserIds: [],
  status: 'idle',
};

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        /* eslint-disable no-param-reassign */
        state.status = 'loading';
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.loadedUserIds.push(action.meta.arg);
        state.items = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default userPostsSlice.reducer;
