/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface UsersState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlise = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initPosts.rejected, (state) => {
      state.hasError = 'unable to download posts';
      state.loaded = true;
    });
  },
});

export default postsSlise.reducer;
export const { clear } = postsSlise.actions;
