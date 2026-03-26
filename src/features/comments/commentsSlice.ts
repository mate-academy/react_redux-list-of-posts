/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface CommentState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setItems, setLoaded, setHasError } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) =>
  !state.comments.loaded;

export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
