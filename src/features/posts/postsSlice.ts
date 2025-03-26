/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialStateProps = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialStateProps = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.hasError = '';
      state.loaded = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.hasError = action.error.message || 'Failed to fetch posts';
      state.loaded = false;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
