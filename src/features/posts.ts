/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

export const init = createAsyncThunk<Post[], number>(
  'posts/fetchByUserId',
  async userId => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(init.pending, (state: PostState) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state: PostState, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state: PostState) => {
      state.loading = false;
      state.error = 'Error loading posts';
    });
  },
});

export default postsSlice.reducer;
export const { setPosts, setSelectedPost } = postsSlice.actions;
