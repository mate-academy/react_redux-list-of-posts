import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type PostsState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return { ...state, loading: false };
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return {
          ...state,
          posts: action.payload,
          loading: true,
        };
      },
    );
    builder.addCase(fetchPosts.rejected, state => {
      return {
        ...state,
        loading: true,
        error: true,
      };
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
