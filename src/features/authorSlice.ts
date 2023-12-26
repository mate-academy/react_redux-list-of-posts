/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AutorState {
  author: User | null;
}

const initialState: AutorState = {
  author: null,
};

export const autorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default autorSlice.reducer;
export const { actions } = autorSlice;
