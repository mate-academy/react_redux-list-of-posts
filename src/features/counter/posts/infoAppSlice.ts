/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

type AppState = {
  items: Post[] | [];
  loaded: boolean;
  hasError: boolean;
};

const initialState: AppState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'AppInfo/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const infoAppSlice = createSlice({
  name: 'AppInfo',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default infoAppSlice.reducer;
export const { setPosts } = infoAppSlice.actions;
