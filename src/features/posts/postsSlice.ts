import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loaded: true,
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
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(postsAsync.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(postsAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(postsAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
