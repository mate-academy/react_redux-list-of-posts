/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export type CommentsState = {
  comms: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comms: [],
  loaded: false,
  hasError: false,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comms = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comms.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comms = state.comms.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export const { actions } = commentSlice;
export default commentSlice.reducer;
