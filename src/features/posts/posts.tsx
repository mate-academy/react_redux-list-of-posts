/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const initPosts = createAsyncThunk('post/fetch', (
  userId: number,
) => getUserPosts(userId));

type InitialStateProps = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: InitialStateProps = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(initPosts.fulfilled, (
      state,
      action: PayloadAction<Post[]>,
    ) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
