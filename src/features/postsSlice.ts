import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPost',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    cleanPosts: state => {
      return { ...state, loaded: false, hasError: false, items: [] };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchPosts.rejected, state => {
        return { ...state, loaded: true, hasError: true };
      });
  },
});

export const { cleanPosts } = postsSlice.actions;

export default postsSlice.reducer;
