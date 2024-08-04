/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice: Slice<PostsState> = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    showPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { showPosts } = postsSlice.actions;
