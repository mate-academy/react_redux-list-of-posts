import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Post[],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changePosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
    changeLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    changeHasError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export default postSlice.reducer;
export const { changeHasError, changeLoaded, changePosts } = postSlice.actions;
