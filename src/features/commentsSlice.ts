/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';
import type { RootState } from '../app/store';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
  items: Comment[],
};

const initialComments: InitialState = {
  loaded: false,
  hasError: false,
  visible: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialComments,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
export const commentsListStates = (state: RootState) => state.comments;
