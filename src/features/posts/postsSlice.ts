/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  }
});

export default postsSlice.reducer;
export const { clear, setSelectedPost} = postsSlice.actions;

