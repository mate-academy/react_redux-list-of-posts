import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  items: Post [] | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: null,
  isLoading: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchPosts',
  async (userId) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[] | null>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

      .addCase(fetchUserPosts.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
