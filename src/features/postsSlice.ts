import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  isLoading: boolean;
  errorMessage: boolean;
  selectedPost: Post | null;
};

const initialState: PostsState = {
  items: [],
  isLoading: false,
  errorMessage: false,
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectedPosts: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
    clearPosts: state => {
      return { ...state, items: [] };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        return {
          ...state,
          isLoading: false,
          errorMessage: false,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: true,
          errorMessage: false,
        };
      })
      .addCase(fetchPosts.rejected, state => {
        return {
          ...state,
          isLoading: true,
          errorMessage: true,
        };
      });
  },
});

export const { selectedPosts, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
