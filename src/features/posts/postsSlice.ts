import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";
import { getUserPosts } from "../../api/posts";

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);
    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      });
  },
});
export default postsSlice.reducer;
