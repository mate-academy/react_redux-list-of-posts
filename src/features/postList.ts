/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number, { rejectWithValue }) => {
    try {
      const posts = await getUserPosts(userId);

      return posts;
    } catch (error) {
      return rejectWithValue('Unable to load posts');
    }
  },
);

export const postSlice = createSlice({
  name: 'posts',
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

// export const {} = postSlice.actions;
export const postsLists = (state: RootState) => state.posts.posts;

export default postSlice.reducer;
