import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface State {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: State = {
  items: [],
  loaded: true,
  hasError: false,
};

/* eslint-disable */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});
/* eslint-enable */

export default postsSlice.reducer;
export const { actions } = postsSlice;
