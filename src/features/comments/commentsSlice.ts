/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    setCommentsLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setCommentsHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setComments, setCommentsLoaded, setCommentsHasError } =
  commentsSlice.actions;
export default commentsSlice.reducer;
