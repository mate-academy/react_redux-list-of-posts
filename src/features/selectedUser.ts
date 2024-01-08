/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UserState = {
  selectedUser: User | null,
};

const initialState: UserState = {
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { select } = userSlice.actions;
