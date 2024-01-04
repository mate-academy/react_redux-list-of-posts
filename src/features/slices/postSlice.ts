import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from '../thunks/postThunk';

export type PostState = {
  posts: Post[];
  selectedPost: null | Post;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  isLoading: true,
  hasError: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        posts: action.payload,
      }))
      .addCase(fetchPosts.rejected, (state) => (
        { ...state, isLoading: false, hasError: true }));
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
