import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('posts/fetch', async (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(init.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(init.fulfilled, (_, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(init.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      })),
});
