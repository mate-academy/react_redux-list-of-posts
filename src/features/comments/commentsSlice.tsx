/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  loaded: boolean,
  hasError: boolean,
  comments: Comment[],
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { setLoaded, setHasError, setComments } = commentsSlice.actions;
