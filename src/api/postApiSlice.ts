import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from './posts';
import { Post } from '../types/Post';

export const fetchPostsByUserId = createAsyncThunk(
  'posts/fetchByUserId',
  getUserPosts,
);

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | undefined;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: undefined,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPostsByUserId.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchPostsByUserId.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    });

    builder.addCase(fetchPostsByUserId.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });
  },
});

export default postSlice.reducer;
