import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchUserPosts } from '../../utils/thunks/fetchUserPosts';

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
      state.posts = [];
    });
  },
});

export const { setSelectedPost, clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
