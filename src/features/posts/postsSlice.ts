/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';

type InitialState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: false,
};

/* eslint-disable @typescript-eslint/indent,prettier/prettier */
export const loadPosts = createAsyncThunk<
  Post[],
  void,
  { state: RootState }
>(
  'posts/loadPosts',
  async (_, { getState }) => {
    const userId = getState().author?.id;

    if (userId) {
      return getUserPosts(userId);
    }

    return [];
});
/* eslint-disable @typescript-eslint/indent,prettier/prettier */

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadPosts.pending,
        (state) => {
          state.loaded = false;
        })
      .addCase(
        loadPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        })
      .addCase(
        loadPosts.rejected,
        (state) => {
          state.hasError = true;
          state.loaded = true;
        });
  },
});

export default postsSlice.reducer;
