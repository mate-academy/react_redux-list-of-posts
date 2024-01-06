import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from '../thunks/postsThumk';

type PostsState = {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: boolean
};

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      currentPost: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, state => ({
      ...state,
      loading: true,
    }));
    builder.addCase(fetchPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loading: false,
    }));
    builder.addCase(fetchPosts.rejected, state => ({
      ...state,
      loading: false,
      error: true,
    }));
  },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = postsSlice.actions;
