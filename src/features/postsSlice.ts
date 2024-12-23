import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../types/Post";
import { getUserPosts } from "../api/posts";

type State = {
  loaded: boolean,
  hasError: boolean,
  posts: Post[]
}

const initialState: State = {
  loaded: true,
  hasError: false,
  posts: []
}

export const setPost = createAsyncThunk(
  'posts/fetchPost',
  async (userId: number) => {
    try {
      const posts = await getUserPosts(userId)
      return posts;
    } catch (error) {
      throw error
    }
  }
)
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPost.pending, (state) =>{state.loaded = false})
      .addCase(setPost.rejected, (state) => {
        state.hasError = true
        state.loaded = true
      })
      .addCase(setPost.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loaded = true

      })
  }
})

export default postsSlice.reducer;
