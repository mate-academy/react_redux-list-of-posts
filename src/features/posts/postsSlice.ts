/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../types/LoadingStatus';
import { getUserPosts } from '../../api/posts';
import { User } from '../../types/User';
import { Post } from '../../types/Post';

type State = {
  posts: Post[];
  selectedPost: Post | null;
  status: LoadingStatus;
};

const initialState: State = {
  posts: [],
  selectedPost: null,
  status: LoadingStatus.Idle,
};

export const getPostsAsync = createAsyncThunk(
  'posts/getPostsAsync',
  async (user: User) => {
    const posts = await getUserPosts(user.id);

    return posts;
  },
);

const usersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearPostSelection: state => {
      state.selectedPost = null;
    },
    clearPosts: state => {
      state.posts = [];
      state.selectedPost = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsAsync.pending, state => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.status = LoadingStatus.Idle;
        state.posts = action.payload;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.status = LoadingStatus.Failed;
      });
  },
});

export const { selectPost, clearPostSelection, clearPosts } =
  usersSlice.actions;

export default usersSlice.reducer;
