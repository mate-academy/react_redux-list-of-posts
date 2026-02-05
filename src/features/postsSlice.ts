import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
  selectedPost: Post | null;
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
  selectedPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => ({
      ...state,
      items: [],
    }),
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
  extraReducers(builder) {
    builder.addCase(initPosts.pending, state => ({
      ...state,
      loaded: false,
    }));

    builder.addCase(initPosts.rejected, state => ({
      ...state,
      hasError: true,
      loaded: true,
    }));

    builder.addCase(initPosts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }));
  },
});

export const { clearPosts, setSelectedPost } = postsSlice.actions;
