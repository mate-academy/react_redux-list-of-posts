/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface UserPostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string;
}

const initialState: UserPostsState = {
  posts: [],
  status: 'idle',
  error: '',
};

export const fetchPosts = createAsyncThunk(
  'userPosts/fetchPosts',
  async (userId: number, { rejectWithValue }) => {
    try {
      const posts = await getUserPosts(userId);

      return posts;
    } catch (error) {
      return rejectWithValue('Unable to load posts');
    }
  },
);

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const userPostsList = (state: RootState) => state.userPosts.posts;

export default userPostsSlice.reducer;
