/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [] as Comment[],
    loaded: false,
    hasError: false,
  },
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
      state.loaded = true;
    },
    setError(state) {
      state.hasError = true;
      state.loaded = false;
    },
    setLoading(state) {
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const { setComments, setError, setLoading } = commentsSlice.actions;
export default commentsSlice.reducer;
