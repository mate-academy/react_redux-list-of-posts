/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export interface PostsSlice {
  posts: Post[];
  selectedPost: number | null;
  status: 'idle' | 'loading' | 'failed';
}
const initialState: PostsSlice = {
  posts: [],
  selectedPost: null,
  status: 'idle',
};

export const loadPosts = createAsyncThunk(
  'posts/SET',
  (async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  }),
);

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<number>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectPost } = PostSlice.actions;
export const setPosts = (state: RootState) => state.posts;
export default PostSlice.reducer;
