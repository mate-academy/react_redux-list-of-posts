import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  isError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
    clearPost: (state) => {
      return { ...state, posts: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        isLoading: true,
        isError: false,
      };
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      return {
        ...state,
        isError: true,
        isLoading: true,
      };
    });
  },
});

export const { clearPost, selectPost } = postSlice.actions;
export default postSlice.reducer;
