/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setUsersError(state) {
      state.hasError = true;
      state.loaded = false;
    },
    clearUsers(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const { setUsers, setUsersError, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
