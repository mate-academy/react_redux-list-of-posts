/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[],
  isLoading: boolean,
  isError: boolean,
  selectedPost: Post | null,
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isError: false,
  selectedPost: null,
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.posts = action.payload;
          state.isLoading = false;
        })
      .addCase(getPostsAsync.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
export const { set, setPost } = postsSlice.actions;
