/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

export const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const selectedUserReducer = selectedUserSlice.reducer;
export const { selectUser } = selectedUserSlice.actions;
