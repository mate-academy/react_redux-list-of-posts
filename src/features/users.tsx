/* eslint no-param-reassign: ["error", { "props": false }] */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[],
  error: string,
};

const initialState: UsersState = {
  users: [],
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { set, setError } = usersSlice.actions;
