import { Slice, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const usersSlice: Slice<UsersState> = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
