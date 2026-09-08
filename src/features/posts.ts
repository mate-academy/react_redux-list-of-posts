import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  posts: Post[] | null;
  loaded: boolean;
  error: boolean;
};

const initialState: InitialState = {
  posts: [],
  loaded: false,
  error: false,
};

export const init = createAsyncThunk('userPosts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      loaded: false,
      error: false,
    }));
    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      posts: action.payload,
    }));
    builder.addCase(init.rejected, state => ({
      ...state,
      loaded: true,
      error: true,
    }));
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
