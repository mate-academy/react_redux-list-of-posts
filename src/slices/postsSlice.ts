/* eslint-disable no-param-reassign */
import { getUserPosts } from '../api/posts';
import { Post } from './../types/Post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type StateProps = {
  loaded: boolean;
  hasError: boolean;
  item: Post[];
};

const initialState: StateProps = {
  loaded: false,
  hasError: false,
  item: [],
};

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async postId => {
    try {
      const respond = await getUserPosts(postId);

      return respond;
    } catch (error) {
      throw new Error('Error');
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.item = [];
      });
  },
});

export default postsSlice.reducer;
