import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type Posts = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice<Posts, SliceCaseReducers<Posts>, string>({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const { setItems, setLoaded, setError } = postsSlice.actions;
export default postsSlice.reducer;
