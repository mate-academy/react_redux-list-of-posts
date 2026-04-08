/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type Posts = {
  items: Post[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchUserPostsThunk = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async userId => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUserPostsThunk.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchUserPostsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(fetchUserPostsThunk.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Failed to load posts';
      });
  },
});

export default postsSlice.reducer;
export const { setPost } = postsSlice.actions;
