import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type Posts = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: Posts = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setItems, setLoaded, setError } = postsSlice.actions;
export default postsSlice.reducer;
