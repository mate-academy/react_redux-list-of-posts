import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
  },
});

export const commentsActions = commentsSlice.actions;
