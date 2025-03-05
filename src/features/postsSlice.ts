import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  posts: [] as Post[],
  hasError: false,
};

export const postsInit = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setEmpty(state) {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(postsInit.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(postsInit.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loaded: true,
      };
    });

    builder.addCase(postsInit.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { setEmpty } = postsSlice.actions;
export default postsSlice.reducer;
