/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  selected: User | null;
}

const initialState: AuthorState = {
  selected: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.selected = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
