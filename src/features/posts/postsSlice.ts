/* eslint-disable no-param-reassign */
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setPosts, addPost, removePost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
