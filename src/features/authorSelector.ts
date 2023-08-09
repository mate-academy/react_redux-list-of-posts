/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';
import { SelectedAuthor } from '../types/SelectedAuthor';

const initialState: SelectedAuthor = {
  author: null,
  posts: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('fetch/posts', (id: number) => {
  return getUserPosts(id);
});

const authorSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addAuthor: (state, actions:PayloadAction<User>) => {
      state.author = actions.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, actions) => {
      state.posts = actions.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { addAuthor } = authorSlice.actions;
export default authorSlice.reducer;
