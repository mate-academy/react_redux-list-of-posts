import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  isPostsLoading: boolean;
  errorMessageOnPostLoading: string;
}

const initialState: PostsState = {
  posts: [],
  isPostsLoading: false,
  errorMessageOnPostLoading: '',
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, state => {
      return { ...state, isPostsLoading: true };
    });
    builder.addCase(
      loadUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return { ...state, posts: action.payload, isPostsLoading: false };
      },
    );
    builder.addCase(loadUserPosts.rejected, state => {
      return {
        ...state,
        isPostsLoading: false,
        errorMessageOnPostLoading: 'an error on posts loading',
      };
    });
  },
});

export const { setPosts } = postsSlice.actions;
