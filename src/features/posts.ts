import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const initUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loaded: false,
    hasError: false,
    items: [] as Post[],
  },
  reducers: {
    setItems: (
      state,
      action: PayloadAction<Post[]>,
    ) => ({ ...state, items: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(initUserPosts.pending, (state) => (
      { ...state, loaded: false }
    ));
    builder.addCase(initUserPosts.fulfilled, (state, action) => (
      { ...state, items: action.payload, loaded: true }
    ));
    builder.addCase(initUserPosts.rejected, (state) => (
      { ...state, hasError: true, loaded: true }
    ));
  },
});

export default postsSlice.reducer;
export const { setItems } = postsSlice.actions;
