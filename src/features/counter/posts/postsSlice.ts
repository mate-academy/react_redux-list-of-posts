/* eslint-disable no-param-reassign */
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserPosts(userId);
    } catch {
      return rejectWithValue('Failed to load posts');
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
