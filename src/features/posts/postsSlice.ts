/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[]
  loaded: boolean
  hasError: boolean
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const value = await getUserPosts(id);

    return value;
  },
);

export const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state: PostsState, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { setPosts } = userPostsSlice.actions;

export default userPostsSlice.reducer;
