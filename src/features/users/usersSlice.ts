/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UsersState {
  selectedUser: User | null;
}

const initialState: UsersState = {
  selectedUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
