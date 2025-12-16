import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsAsync = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(postsAsync.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(postsAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    });
    builder.addCase(postsAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
