/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  loaded: boolean,
  hasError: boolean,
  items: Post [],
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setItems: (state, action: PayloadAction<Post []>) => {
      state.items = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setLoaded, setHasError, setItems } = postsSlice.actions;
