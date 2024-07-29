// import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { fetchUserPosts } from '../servises/api';

type PostsSlice = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return fetchUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(loadPosts.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
// export const { setSelectedUserPosts } = postsSlice.actions;
