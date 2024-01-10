import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface T {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
}

const initialState: T = {
  loaded: false,
  hasError: false,
  items: [] as Post[],
};

// export const init = createAsyncThunk(
//   'posts/loadUserPosts',
//   async (userId: number) => getUserPosts(userId),
// );

export const init = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    return await getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loaded: true };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loaded: false, items: action.payload };
    });
    // builder.addCase(init.rejected, (state) => {
    //   return { ...state, loaded: false, hasError: true };
    // });

    builder.addCase(init.rejected, (state) => ({
      state.loaded: false;
      state.hasError: true;
    }));
  },
});

export default postsSlice.reducer;
