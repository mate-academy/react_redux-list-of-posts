/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError(state) {
      state.hasError = true;
      state.loaded = false;
    },

    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
  },
});

export const { setComments, setError, setLoaded } = commentsSlice.actions;
export default commentsSlice.reducer;
