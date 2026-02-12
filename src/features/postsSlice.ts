import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';

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

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (authorId: number) => {
    const posts = await getUserPosts(authorId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState): Post[] => state.posts.items;
export const selectPostsStatus = createSelector(
  (state: RootState) => state.posts.loaded,
  (state: RootState) => state.posts.hasError,
  (loaded, hasError) => ({ loaded, hasError }),
);
