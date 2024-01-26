/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface InitialStoreAuthor {
  value: User | null;
}

const initialState: InitialStoreAuthor = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author  ',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;
export default authorSlice.reducer;
