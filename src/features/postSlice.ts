import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostState = {
  posts: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { clearPosts, setSelectedPost, clearSelectedPost } =
  postSlice.actions;
