/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type InitialState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  hasError: false,
  items: [],
  loaded: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items.filter(item => item.id !== action.payload);
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { set, setHasError, remove, setLoaded } = commentsSlice.actions;
export default commentsSlice.reducer;
