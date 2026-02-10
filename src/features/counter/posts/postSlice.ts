/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.selectedPost = null;
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export default postsSlice;
export const { addSelectedPost } = postsSlice.actions;

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});
