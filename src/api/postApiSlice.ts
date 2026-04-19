import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from './posts';
import { Post } from '../types/Post';

export const fetchPostsByUserId = createAsyncThunk(
  'posts/fetchByUserId',
  getUserPosts,
);

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPostsByUserId.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(fetchPostsByUserId.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        items: action.payload,
        hasError: false,
      };
    });

    builder.addCase(fetchPostsByUserId.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export default postSlice.reducer;
