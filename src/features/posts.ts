import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  items: Post[] | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('userPosts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    setPosts: (state, action) => ({
      ...state,
      items: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: action.payload,
    }));
    builder.addCase(init.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
