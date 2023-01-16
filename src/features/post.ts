import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts', async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => ({
      ...state,
      posts: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => ({
        ...state,
        loaded: true,
      }))
      .addCase(fetchPostsAsync.fulfilled, (
        state,
        action: PayloadAction<Post[]>,
      ) => ({
        ...state,
        posts: action.payload,
        loaded: false,
      }))
      .addCase(fetchPostsAsync.rejected, (state) => ({
        ...state,
        loaded: false,
        hasError: true,
      }));
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
