/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setComments: (state, actions: PayloadAction<Comment[]>) => {
      state.items = actions.payload;
      state.hasError = false;
    },
    setLoaded: (state, actions: PayloadAction<boolean>) => {
      state.loaded = actions.payload;
    },
    setError: (state, actions: PayloadAction<boolean>) => {
      state.hasError = actions.payload;
    },
  },
});

export default commentsSlice.reducer;
