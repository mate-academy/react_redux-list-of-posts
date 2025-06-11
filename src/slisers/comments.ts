/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { fetchComments } from './asyncThunkComments';

export interface TypeComments {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: TypeComments = {
  items: [],
  hasError: false,
  loaded: false,
};

const comments = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action) => (state.items = action.payload),
    setError: (state, action) => (state.hasError = action.payload),
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default comments.reducer;
export const { setComments, setError } = comments.actions;
