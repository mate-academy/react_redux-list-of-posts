import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
      loading: false,
    }),
    fetchPostsError: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsError } =
  postsSlice.actions;
export const postsReducer = postsSlice.reducer;
