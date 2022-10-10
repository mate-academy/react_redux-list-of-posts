/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../../types/Post';

export interface InitialState {
  posts: Post[] | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: InitialState = {
  posts: null,
  loaded: false,
  hasError: false,
};

const GET_URL = 'https://mate.academy/students-api/posts?userId=';

export const fetchPosts = createAsyncThunk('users/fetchPosts',
  async (userId: number) => {
    const response = await axios.get(`${GET_URL}${userId}`);

    return response.data;
  });

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts = [];
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.hasError = false;

        state.posts = [...action.payload];
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
        state.posts = [];
      });
  },
});

export default postsSlice.reducer;
