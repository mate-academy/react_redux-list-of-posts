/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../enums/LoadingStatuses';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
import { handleItemsLoading, handleItemsSuccess } from '../helpers/helpers';

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchPosts',
  (id: number) => {
    return getUserPosts(id);
  },
);

interface InitialState {
  posts: Post[];
  postsLoadStatus: LoadingStatuses;
  activePost: Post | null;
}

const initialState: InitialState = {
  posts: [],
  postsLoadStatus: LoadingStatuses.idle,
  activePost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setActivePost: (state, action) => {
      state.activePost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state: InitialState) => {
        handleItemsLoading(state, 'postsLoadStatus', 'loading');
      })
      .addCase(fetchPosts.fulfilled, (state: InitialState, action) => {
        handleItemsSuccess(state, 'posts', action.payload, 'postsLoadStatus');
      })
      .addCase(fetchPosts.rejected, (state: InitialState) => {
        handleItemsLoading(state, 'postsLoadStatus', 'error');
      })
      .addDefaultCase(() => {});
  },
});

export const { setActivePost } = postsSlice.actions;

export default postsSlice.reducer;
