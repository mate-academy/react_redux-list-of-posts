import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
}

const initialState: PostsState = {
  loaded: true,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('posts/fetch',
  async (id: number) => {
    const userPosts = await getUserPosts(id);

    return userPosts;
  });

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export default postsSlice.reducer;
