/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface UsersState {
  posts: Post[];
  hasError: boolean;
  loader: boolean;
  selectedPost: Post | null;
}

const initialState: UsersState = {
  posts: [],
  hasError: false,
  loader: false,
  selectedPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    deletePost: state => {
      state.selectedPost = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loader = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loader = true;
    });

    builder.addCase(init.rejected, state => {
      state.loader = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { set, setPost, deletePost } = postsSlice.actions;

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});
