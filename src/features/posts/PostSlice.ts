/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loading: boolean;
  hasError: string;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: '',
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.hasError = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        state.loading = false;
        state.hasError = 'Error';
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
