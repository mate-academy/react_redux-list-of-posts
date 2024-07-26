/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

export const asyncGetPosts = createAsyncThunk(
  'posts/getPosts',
  async (id: number) => {
    const value = await getUserPosts(id).then(data => data);

    return value.filter(elem => elem.userId === id);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: state => {
      state.value = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(asyncGetPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(asyncGetPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(asyncGetPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
