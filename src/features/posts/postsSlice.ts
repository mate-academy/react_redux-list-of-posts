/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsInfo = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

export const init = createAsyncThunk(
  'userPosts/fetchPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const initialState: PostsInfo = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    // set: (state: AuthorInfo, action: PayloadAction<User>) => {
    //   state.author = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
