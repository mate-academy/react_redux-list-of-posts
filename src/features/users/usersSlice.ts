/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

interface UserSlice {
  users: User[],
  hasError: boolean
}

const initialState: UserSlice = {
  users: [],
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.hasError = false;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
