/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  selectedPost: Post | null;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  selectedPost: null,
};

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const posts = await getUserPosts(userId);

      return posts;
    } catch {
      return rejectWithValue('Failed to load posts');
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearPosts: state => {
      state.posts = [];
      state.selectedPost = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.posts = [];
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
/* eslint-enable no-param-reassign */
