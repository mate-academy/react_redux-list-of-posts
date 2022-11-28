/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[],
  error: string,
  loaded: boolean,
};

const initialState: UsersState = {
  users: [],
  error: '',
  loaded: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loaded = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loaded = true;
    },
    setloading(state) {
      state.loaded = false;
    },
  },
});

export default usersSlice.reducer;

export const {
  setUsers,
  setError,
  setloading,
} = usersSlice.actions;
