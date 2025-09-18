import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: '',
};

export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/loadPosts',

  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.hasError = '';
        state.loaded = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || '';
      });
  },
});

export const { setPosts, addPost, removePost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
