/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentState = {
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
  comments: Comment[];
};

const initialState: CommentState = {
  loaded: false,
  hasError: false,
  visible: false,
  comments: [],
};

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
});

export const commentReducer = commentSlice.reducer;
export const { actions } = commentSlice;
