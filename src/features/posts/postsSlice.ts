/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[],
  loading: boolean,
  hasError: boolean,
  selectedPost: Post | null,
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  hasError: false,
  selectedPost: null,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const res = await getUserPosts(userId);

    return res;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      });
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.hasError = true;
      state.loading = false;
    });
  },
});

export const { setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
