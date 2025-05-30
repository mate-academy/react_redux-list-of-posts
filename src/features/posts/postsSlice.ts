import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => ({
      ...state,
      hasError: false,
      loaded: false,
    }));
    builder.addCase(fetchUserPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      posts: action.payload,
    }));
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
