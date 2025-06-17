/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostsState = {
  items: [],
  loaded: true,
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
      state.loaded = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = false;
        state.hasError = 'Error';
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
