/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type UserPostsState = {
  userPosts: Post[]
  userPostError: string
  userPostsLoading: boolean
};

const initialState: UserPostsState = {
  userPosts: [],
  userPostError: '',
  userPostsLoading: false,
};

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    remove(state) {
      state.userPosts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userPosts.pending, state => {
        state.userPostsLoading = true;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        state.userPostsLoading = false;
        state.userPosts = action.payload;
      })
      .addCase(userPosts.rejected, state => {
        state.userPostsLoading = false;
        state.userPostError = 'Error';
      });
  },
});

export default userPostsSlice.reducer;

export const { remove } = userPostsSlice.actions;

export const userPosts = createAsyncThunk('userPosts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  });
