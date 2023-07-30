/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../types/User';

export interface CounterState {
  currentrUser: User | null;
}

const initialState: CounterState = {
  currentrUser: null,
};

export const currentUserSlice = createSlice({
  name: 'currentrUser',
  initialState,
  reducers: {
    add: (state, action:PayloadAction<User>) => {
      state.currentrUser = action.payload;
    },
  },
});

export const { add } = currentUserSlice.actions;

export default currentUserSlice.reducer;
