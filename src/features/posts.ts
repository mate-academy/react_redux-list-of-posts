/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

//thunk
export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',

  async (id: number) => {
    const response = await getUserPosts(id);

    return response;
  },
);

type PostsState = {
  items: Post[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.loaded = true;
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.loaded = false;
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});
