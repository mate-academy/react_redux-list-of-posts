import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;

const post = (state: RootState) => state.selectedPost;

export const selectedPostSelector = createSelector([post], value => value);

export const { set } = selectedPostSlice.actions;
