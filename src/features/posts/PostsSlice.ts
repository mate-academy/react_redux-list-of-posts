import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { loadPosts } from './Thunks';

type PostsState = {
  loading: boolean;
  posts: Post[];
  error: string;
  selectedPost: Post | null;
};

const initialState: PostsState = {
  loading: false,
  posts: [],
  error: '',
  selectedPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<Post>) {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    clearPosts(state) {
      return {
        ...state,
        posts: [],
        selectedPost: null,
      };
    },
    clearPost(state) {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => ({
      ...state,
      error: '',
      loading: true,
    }));
    builder.addCase(loadPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loading: false,
    }));
    builder.addCase(loadPosts.rejected, (state, action) => ({
      ...state,
      error: action.error.message || '',
      loading: false,
    }));
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectCurrentPost = (state: RootState) => state.posts.selectedPost;
export const { setPost, clearPost, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
