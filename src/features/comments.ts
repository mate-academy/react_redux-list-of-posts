/* eslint-disable no-console */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface Comments {
  items: Comment[],
  loaded: boolean,
  hasError: boolean
}

const initialState: Comments = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (
      state: Comments,
      action: PayloadAction<Comment[]>,
    ) => ({
      ...state,
      items: [...action.payload],
    }),

    setError: (
      state: Comments,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      hasError: action.payload,
    }),

    setLoaded: (
      state: Comments,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      loaded: action.payload,
    }),
  },
});

export const { setItems, setLoaded, setError } = commentsSlice.actions;
