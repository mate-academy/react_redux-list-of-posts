import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface T {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
}

export const initialState: T = {
  loaded: false,
  hasError: false,
  items: [] as Post[],
};

export const init = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    const post = await getUserPosts(userId);

    return post;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // builder.addCase(init.pending, (state) => {
    //   return { ...state, loaded: true };
    // });
    // builder.addCase(init.fulfilled, (state, action) => {
    //   return { ...state, loaded: false, items: action.payload };
    // });
    // builder.addCase(init.rejected, (state) => {
    //   return { ...state, loaded: false, hasError: true };
    // });

    // builder.addCase(init.rejected, (state) => ({
    //   state.loaded = false;
    //   state.hasError = true;
    // }));

    /* eslint-disable no-param-reassign */
    builder.addCase(init.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
