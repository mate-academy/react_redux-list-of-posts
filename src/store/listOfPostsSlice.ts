// there I imported rootState from store because i use it in selectors for this inner state

/* eslint-disable import/no-cycle */

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

/* eslint-disable no-param-reassign */

// i use action before initialization in thunk so i need it to off warning of linter

/* eslint-disable @typescript-eslint/no-use-before-define */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getUsersPosts, getUserPostsById } from '../api/posts';
import { Post } from '../types/Post';

interface ListOfPostsState {
  selectedPostId: number;
  posts: Array<Post> | null;
  isPostListLoading: boolean;
  filterByUserId: number;
}

const initialState: ListOfPostsState = {
  selectedPostId: 0,
  posts: null,
  isPostListLoading: false,
  filterByUserId: 0,
};

export const fetchUserPostsById = createAsyncThunk(
  'listOfPosts/fetchUserPostsById',
  async (userId: number, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setIsPostListLoading(true));
    let response;

    if (userId === 0) {
      response = await getUsersPosts();
    } else {
      response = await getUserPostsById(userId);
    }

    dispatch(setIsPostListLoading(false));

    return response;
  },
);

export const listOfPosts = createSlice({
  name: 'listOfPosts',
  initialState,
  reducers: {
    setSelectedPostId: (state, action: PayloadAction<number>) => {
      state.selectedPostId = action.payload;
    },
    setFilterByUserId: (state, action: PayloadAction<number>) => {
      state.filterByUserId = action.payload;
    },
    setIsPostListLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostListLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPostsById.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const {
  setSelectedPostId,
  setFilterByUserId,
  setIsPostListLoading,
} = listOfPosts.actions;

export const selectors = {
  getPosts: (state: RootState) => state.listOfPosts.posts,
  getSelectedPostId: (state: RootState) => state.listOfPosts.selectedPostId,
  getIsPostListLoading: (state: RootState) => {
    return state.listOfPosts.isPostListLoading;
  },
  getFilterByUserId: (state: RootState) => state.listOfPosts.filterByUserId,
};

export default listOfPosts.reducer;
