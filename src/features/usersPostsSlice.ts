/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type UsersState = {
  userPosts: Post[];
  selectedPost: Post | null;
};

const initialState: UsersState = {
  userPosts: [],
  selectedPost: null,
};

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.userPosts = action.payload;
    },
  },
});

export default userPostsSlice.reducer;
export const { setSelectedPost, setUserPosts } = userPostsSlice.actions;
