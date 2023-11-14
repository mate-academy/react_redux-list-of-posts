/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  status: 'idle',
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<number>) => {
      state.selectedPost = state.posts.find(post => {
        return post.id === action.payload;
      }) || null;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
    clearPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.status = 'idle';
      state.posts = action.payload;
    });
  },
});

export const postsSelector = (state: RootState) => state.posts;

export const { selectPost, clearPost } = postsSlice.actions;
export default postsSlice.reducer;
