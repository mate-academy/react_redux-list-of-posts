import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type ItemState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: ItemState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('post/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postSlice.reducer;
export const { clearPosts } = postSlice.actions;
