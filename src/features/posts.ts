import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = { items: [], loaded: false, hasError: false };

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: () => initialState,
    received: (_state, action: PayloadAction<Post[]>) => ({
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    failed: state => ({ ...state, loaded: true, hasError: true }),
  },
});

export const { reset, received, failed } = slice.actions;
export default slice.reducer;
