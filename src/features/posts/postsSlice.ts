/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUPostssAsync = createAsyncThunk(
  'posts/fetchCount',
  async (userId: number) => {
    const data = await client.get<Post[]>(`/posts?userId=${userId}`);

    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUPostssAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchUPostssAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchUPostssAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsHasError = (state: RootState) => state.posts.hasError;

export default postsSlice.reducer;
