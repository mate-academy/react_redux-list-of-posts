/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}
const initialState: PostState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const postsAsync = createAsyncThunk(
  'posts/fechPosts',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(postsAsync.pending, state => {
        state.loaded = false;
      })

      .addCase(postsAsync.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })

      .addCase(postsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const posts = (state: RootState) => state.posts;
export const { setItems } = postsSlice.actions;
export default postsSlice.reducer;
