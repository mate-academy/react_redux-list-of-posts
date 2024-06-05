/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type InitialStateType = {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: InitialStateType = {
  items: [],
  hasError: false,
  loaded: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { fetchPosts, setLoading, setError } = postsSlice.actions;
