/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

interface PostsState {
  posts: Post[],
  loading: boolean,
  error: boolean,
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    take: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter(post => post !== action.payload);
    },
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default postsSlice.reducer;
export const { add, take, clear } = postsSlice.actions;
