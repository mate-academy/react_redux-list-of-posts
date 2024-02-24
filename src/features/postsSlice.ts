import { createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const postsSlice = createSlice({
  name: 'users',
  initialState: {
    posts: [] as Post[] | [],
    loaded: false,
    hasError: false,
  },
  reducers: {
    setPostsEmpty(state) {
      return { ...state, posts: [] };
    },
    setLoaded(state, action) {
      return { ...state, loaded: action.payload };
    },
    setError(state, action) {
      return { ...state, hasError: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { setPostsEmpty, setLoaded, setError } = postsSlice.actions;
