/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type State = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/loadByUser',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
