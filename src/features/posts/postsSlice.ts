/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { DataState } from '../../types/DataState';
import { getUserPosts } from '../../api/posts';

const initialState: DataState<Post> = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPostsByUserId = createAsyncThunk(
  'posts/fetchPostsByUserId',
  async (userId: number, { rejectWithValue }) => {
    try {
      const posts = await getUserPosts(userId);

      return posts;
    } catch (error) {
      return rejectWithValue('Failed to fetch posts');
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUserId.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchPostsByUserId.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchPostsByUserId.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
