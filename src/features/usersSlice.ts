// eslint-disable no-param-reassign
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
