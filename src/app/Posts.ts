import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
/*eslint-disable*/
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

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  (userId: number) => {
    return client.get<Post[]>(`/posts?userId=${userId}`);
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
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
