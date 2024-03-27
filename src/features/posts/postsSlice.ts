/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = 'Something with posts went wrong!';
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
