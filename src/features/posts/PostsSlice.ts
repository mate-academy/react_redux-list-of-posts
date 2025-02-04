/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type StateType = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
};

const initialState: StateType = {
  posts: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<number>) => {
      state.selectedPost =
        state.posts.find(post => post.id === action.payload) || null;
    },
    deleteSelectedPost: state => {
      state.selectedPost = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.loaded = true;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = false;
    });

    builder.addCase(fetchUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export const { setSelectedPost, deleteSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
