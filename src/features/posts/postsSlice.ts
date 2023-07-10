import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const init = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);

export type PostState = {
  items: Post[],
  loading: boolean,
  error: boolean,
};

const initialState: PostState = {
  items: [],
  loading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = false;
    });

    builder.addCase(init.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    });
  },
});

export default postsSlice.reducer;
export const { reset } = postsSlice.actions;
