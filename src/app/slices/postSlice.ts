/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from '../thunks/postThunk';

export type PostState = {
  isLoaded: boolean;
  hasError:boolean;
  posts: Post[];
  selectedPost: null | Post;
};

const initialState:PostState = {
  isLoaded: false,
  hasError: false,
  posts: [],
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return {
          ...state,
          isLoaded: false,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoaded: true,
          posts: action.payload,
        };
      })
      .addCase(fetchPosts.rejected, (state) => {
        return {
          ...state,
          isLoaded: true,
          hasError: true,
        };
      });
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
