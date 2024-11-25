import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);

type InitialState = {
  selectedPost: Post | null;
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  selectedPost: null,
  posts: [],
  loaded: true,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },

    setSelectedPost: (state, { payload }) => {
      state.selectedPost = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.loaded = true;
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clearPosts, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
