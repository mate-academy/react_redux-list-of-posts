import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
  selectedPost: Post | null,
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const loadPosts = createAsyncThunk(
  'post/fetchPosts',
  async (id: number) => getUserPosts(id),
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setPostsToEmpty: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});
export const { setSelectedPost, setPostsToEmpty } = postSlice.actions;
export default postSlice.reducer;
