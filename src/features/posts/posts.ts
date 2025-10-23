import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  loaded: false,
  items: [] as Post[],
  hasError: false,
};

export const loadUserPosts = createAsyncThunk<Post[], number>(
  '/posts',
  async id => getUserPosts(id),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // eslint-disable-next-line no-param-reassign
    builder.addCase(loadUserPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });

    // eslint-disable-next-line no-param-reassign
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    // eslint-disable-next-line no-param-reassign
    builder.addCase(loadUserPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
