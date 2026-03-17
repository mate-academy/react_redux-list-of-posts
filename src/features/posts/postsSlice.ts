import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const initPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId)
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    loaded: false,
    hasError: false,
    selectedPostId: null as number | null,
  },
  reducers: {
    setSelectedPostId: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initPosts.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(initPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setSelectedPostId } = postsSlice.actions;
export default postsSlice.reducer;
