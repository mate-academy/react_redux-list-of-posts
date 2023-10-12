/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from '../thunks/postsThunk';

export type PostState = {
  posts: Post[],
  isLoading: boolean,
  hasError: boolean,
  postSelected: null | Post,
};

const initialState: PostState = {
  posts: [],
  isLoading: false,
  hasError: false,
  postSelected: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.postSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: true,
          posts: action.payload,
        };
      })
      .addCase(fetchPosts.rejected, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: true,
        };
      });
  },
});

export const postReducer = postSlice.reducer;

export const postActions = postSlice.actions;
