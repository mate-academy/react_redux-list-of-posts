import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => ({
      ...state,
      loaded: true,
      hasError: false,
      items: [],
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchUserPosts.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(fetchUserPosts.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
        items: [],
      }));
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
