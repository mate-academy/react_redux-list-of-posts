import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from '../thunks/postThunk';

export type PostState = {
  posts: Post[];
  selectedPost: null | Post
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
    setSelectedPost: (state, action) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }).addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    }).addCase(fetchPosts.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
