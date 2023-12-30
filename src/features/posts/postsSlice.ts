/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  error: boolean,
  loading: boolean,
  selectedPost: Post | null,
}

const initialState: PostsState = {
  posts: [],
  error: false,
  loading: false,
  selectedPost: null,
};

export const init = createAsyncThunk(
  'posts/fetchPosts', (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (posts, action: PayloadAction<Post | null>) => {
      posts.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { selectPost } = postsSlice.actions;
export default postsSlice.reducer;
