/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { User } from '../../types/User';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: User['id']) => getUserPosts(userId),
);

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = { items: [], loaded: false, hasError: false };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },

    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts, clearPosts } = postsSlice.actions;
