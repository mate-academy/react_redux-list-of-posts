import {PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../types/Post";
import { getUserPosts } from "../api/posts";

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postsInit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postsInit.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(postsInit.rejected, (state) => {
      state.loading = false;
      state.error = 'Error'
    });
  },
})

export default postsSlice.reducer;

export const postsInit = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

