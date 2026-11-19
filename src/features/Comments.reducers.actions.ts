import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

/* eslint-disable no-param-reassign */

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
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
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    addComments: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(it => {
        return it.id !== action.payload;
      });
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setComments, addComments, removeComment } = postsSlice.actions;
export default postsSlice.reducer;
