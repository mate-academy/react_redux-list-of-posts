/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'failed',
  posts: Post[],
  selectedPost: Post | null,
};
const initialState: InitialStateType = {
  status: 'idle',
  posts: [],
  selectedPost: null,
};

export const loadPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  (userId:number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setEmptyPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(loadPostsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedPost, setEmptyPosts } = postsSlice.actions;
export const posts = (state: RootState) => state.posts.posts;
export const selectedPost = (state: RootState) => state.posts.selectedPost;

export default postsSlice.reducer;
