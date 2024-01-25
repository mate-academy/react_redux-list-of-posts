/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface InitialStoreUsers {
  value: User[];
}

const initialState: InitialStoreUsers = {
  value: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.value = action.payload;
    },
  },
});

export default usersSlice.reducer;
