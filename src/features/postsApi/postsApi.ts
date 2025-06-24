/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type TypeState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: TypeState = {
  items: [] as Post[],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk('items/fetchByUser', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = false;
      state.hasError = 'Error';
    });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
