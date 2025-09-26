import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetch',
   async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchPostsByUser.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
