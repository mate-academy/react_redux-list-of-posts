/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const postsAsync = createAsyncThunk('posts/get', (userId: number) => {
  return getUserPosts(userId);
});

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    add: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    remove: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter(post => post !== action.payload);
    },
    clear: (state) => {
      state.posts = [];
    },
    selectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postsAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(postsAsync.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
