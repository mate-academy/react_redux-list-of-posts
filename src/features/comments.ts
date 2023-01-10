/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    set: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export default CommentsSlice.reducer;
export const { actions } = CommentsSlice;
