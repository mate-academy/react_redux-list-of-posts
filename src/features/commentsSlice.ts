/* eslint-disable @typescript-eslint/indent */
import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type Comments = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice<
  Comments,
  SliceCaseReducers<Comments>,
  string
>({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const { setItems, setLoaded, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
