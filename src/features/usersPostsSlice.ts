/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type UsersState = {
  userPosts: Post[];
  // loading: boolean;
  // error: string;
  selectedPost: Post | null;
};

const initialState: UsersState = {
  userPosts: [],
  // loading: false,
  // error: '',
  selectedPost: null,
};

// export const init = createAsyncThunk('posts/fetch', () => {
//   getUserPosts();
// });

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
  // extraReducers: builder => {
  //   builder
  //     .addCase(init.pending, state => {
  //       state.loading = true;
  //     })
  //     .addCase(init.fulfilled, (state, action) => {
  //       state.userPosts = action.payload || [];
  //       state.loading = false;
  //     })
  //     .addCase(init.rejected, state => {
  //       state.loading = false;
  //       state.error = 'Thomething went wrong';
  //     });
  // },
});

export default userPostsSlice.reducer;
export const { setSelectedPost, setUserPosts } = userPostsSlice.actions;
