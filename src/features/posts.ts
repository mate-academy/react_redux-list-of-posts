import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Post} from "../types/Post";
import {getPosts} from "../api/posts";

export type postsState = {
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: postsState = {
  posts: [],
  loading: false,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    })
    .addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    })
    .addCase(init.rejected, (state) => {
      state.error = 'Error';
      state.loading = false;
    })
  }
});

export default postsSlice.reducer;

export const init = createAsyncThunk('posts/fetch', () => {
  return getPosts();
})
