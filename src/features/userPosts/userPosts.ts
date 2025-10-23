import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";
import { getUserPosts } from "../../api/posts";

const initialState = {
  loaded: false,
  items: [] as Post[],
  hasError: false,
}

export const loadUserPosts = createAsyncThunk<Post[], number>('/posts', async (id) => await getUserPosts(id))

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadUserPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = false;
    });
  },
})

export default userPostsSlice.reducer;
