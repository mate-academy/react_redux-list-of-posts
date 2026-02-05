import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPosts } from "../../api/posts";
import { Post } from "../../types/Post";

export const postsThunk = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId)
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {items: [] as Post[], loaded: false, hasError: false },
  reducers: {
    clear: (state) => {state.items.length = 0},
  },
  extraReducers: (builder) => {
    builder.addCase(postsThunk.pending, state => {
      state.loaded = false;
      state.hasError = false;
    })
    builder.addCase(postsThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    })
    builder.addCase(postsThunk.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    })
  }
})

export default postsSlice.reducer;
