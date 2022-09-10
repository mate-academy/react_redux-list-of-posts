/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface CommentsState{
  comments: Comment[],
  hasError: boolean,
  loaded: boolean,
}

const initialState: CommentsState = {
  comments: [],
  hasError: false,
  loaded: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[] | []>) => {
      state.comments = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setComments, setLoaded, setHasError } = commentsSlice.actions;

export default commentsSlice.reducer;
