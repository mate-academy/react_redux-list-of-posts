import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type initialUserPosts = {
  userPosts: Post[];
  isLoading: boolean;
  error: string;
};

const initialState: initialUserPosts = {
  userPosts: [],
  isLoading: false,
  error: '',
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetchUserPosts',
  async (userId: number) => {
    const data = await getUserPosts(userId);

    return data;
  },
);

const postsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true;
        // eslint-disable-next-line no-param-reassign
        state.error = '';
      })
      .addCase(fetchUserPosts.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.error = 'Something went wrong';
      });
  },
});

export const userPostsReducer = postsSlice.reducer;
