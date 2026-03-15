/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsUseState {
  selectedPost: Post | null;
  posts: Post[];
  isLoading: boolean;
  error: null | string;
}

const initialState: PostsUseState = {
  selectedPost: null,
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, state => {
      state.posts = [];
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.error = 'Something went wrong!';
      state.isLoading = false;
    });

    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;

        state.posts = action.payload;
      },
    );
  },
});

export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
