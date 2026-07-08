import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<Post[]>) => ({
      ...state,
      items: payload,
    }),
    setLoaded: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      loaded: payload,
    }),
    setError: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      hasError: payload,
    }),
  },
});
