/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    removeSelectedPost: state => {
      state.loading = false;
      state.hasError = false;
      state.selectedPost = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { selectPost, removeSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
