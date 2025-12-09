import { Post } from '../types/Post';
import { User } from '../types/User';
import * as postApi from '../api/posts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type PostsState = {
  items: Post[];
  loading: boolean;
  hasError: boolean;
  author: User | null;
  selectedPostId: number | null;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
  author: null,
  selectedPostId: null,
};

export const loadPostsByUser = createAsyncThunk<Post[], number>(
  'posts/loadPostsByUser',
  async (userId: number) => {
    const posts = await postApi.getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.selectedPostId = null;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    },
    setSelectedPostId(state, action: PayloadAction<number | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostsByUser.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
        // eslint-disable-next-line no-param-reassign
        state.items = [];
      })
      .addCase(loadPostsByUser.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(loadPostsByUser.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.items = [];
        // eslint-disable-next-line no-param-reassign
        state.selectedPostId = null;
      });
  },
});
export const postsReducer = postsSlice.reducer;

// Actions
export const { setAuthor, setSelectedPostId } = postsSlice.actions;

// Selectors
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.hasError;
export const selectAuthor = (state: RootState) => state.posts.author;
export const selectSelectedPostId = (state: RootState) =>
  state.posts.selectedPostId;
