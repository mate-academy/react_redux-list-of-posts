import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { PostsState } from '../types/Reducer';
import { Post } from '../types/Post';

const initialState: PostsState = {
  posts: [] as Post[],
  selectedPost: null,
  hasError: false,
  loading: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
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
    builder.addCase(fetchPosts.pending, state => ({
      ...state,
      loading: true,
      hasError: false,
    }));

    builder.addCase(fetchPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loading: false,
    }));

    builder.addCase(fetchPosts.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));
  },
});

export const { setSelectedPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
