/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
