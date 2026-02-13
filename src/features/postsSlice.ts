import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

interface CurrentPostsState {
  currentPosts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
}

const initialState: CurrentPostsState = {
  currentPosts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

// Thunks
export const getAllUserPosts = createAsyncThunk(
  'currentPosts/fetch',
  async (userID: number) => {
    const response = await getUserPosts(userID);

    return response;
  },
);

export const getSelectedPost = createAsyncThunk(
  'selectedPost/fetch',
  async ({ userId, postId }: { userId: number; postId: number }) => {
    const response = await getUserPosts(userId);
    return response.find(post => post.id === postId) || null;
  }
);

const postsSlice = createSlice({
  name: 'currentPosts',
  initialState,
  reducers: {
    setCurrentPosts: (state, action: PayloadAction<Post[]>) => {
      state.currentPosts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    }
  },

  extraReducers: builder => {
    builder

      .addMatcher(
        action =>
          action.type.endsWith('/pending') &&
          (action.type.startsWith('currentPosts/') ||
            action.type.startsWith('selectedPost/')),
        state => {
          state.loading = true;
          state.error = '';
        },
      )

      .addMatcher(
        action =>
          action.type.endsWith('/fulfilled') &&
          (action.type.startsWith('currentPosts/') ||
            action.type.startsWith('selectedPost/')),
        (state, action) => {
          state.loading = false;
          state.error = '';

          if (action.type === getAllUserPosts.fulfilled.type) {
            state.currentPosts = action.payload;
          } else if (action.type === getSelectedPost.fulfilled.type) {
            state.selectedPost = action.payload;
          }
        }
      )

      .addMatcher(
        action =>
          action.type.endsWith('/rejected') &&
          (action.type.startsWith('currentPosts/') ||
            action.type.startsWith('selectedPost/')),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Error occurred';
        }
      );
  }
});

export default postsSlice.reducer;
export const { setCurrentPosts, setSelectedPost } = postsSlice.actions;
