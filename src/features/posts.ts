/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
