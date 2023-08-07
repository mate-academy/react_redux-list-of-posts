/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';

export interface CounterState {
  selectPost: Post | null;
}

const initialState: CounterState = {
  selectPost: null,
};

export const selectPostSlice = createSlice({
  name: 'selectPost',
  initialState,
  reducers: {
    add: (state, action:PayloadAction<Post>) => {
      state.selectPost = action.payload;
    },
    remove: (state) => {
      state.selectPost = null;
    },
  },
});

export const { add, remove } = selectPostSlice.actions;

export default selectPostSlice.reducer;
