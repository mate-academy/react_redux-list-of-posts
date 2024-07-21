import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { PostsState } from '../types/Reducer';
import { Post } from '../types/Post';

const initialState: PostsState = {
  posts: [] as Post[],
  selectedPost: null,
  hasError: false,
  loaded: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },

  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => ({
      ...state,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(initPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loaded: false,
    }));

    builder.addCase(initPosts.rejected, state => ({
      ...state,
      hasError: true,
      loaded: false,
    }));
  },
});

export const { setSelectedPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
