import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { fetchUserPosts } from '../utils/thunks';

type Posts = {
  posts: Post[] | null;
  isLoading: boolean;
  hasError: boolean;
};

const startState: Posts = {
  posts: null,
  isLoading: false,
  hasError: false,
};

const PostSlice = createSlice({
  name: 'posts',
  initialState: startState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        hasError: false,
      };
    });
    builder.addCase(fetchUserPosts.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export default PostSlice.reducer;
