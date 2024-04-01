import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  isPostsLoading: boolean;
  postsError: string;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  isPostsLoading: false,
  postsError: '',
};

export const initPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      /*eslint no-param-reassign: "error"*/
      state.posts = action.payload;
    },

    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      /*eslint no-param-reassign: "error"*/
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.isPostsLoading = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isPostsLoading = true;
    });

    builder.addCase(initPosts.rejected, state => {
      state.postsError = 'Something went wrong';
      state.isPostsLoading = true;
    });
  },
});

export const { setSelectedPost, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
