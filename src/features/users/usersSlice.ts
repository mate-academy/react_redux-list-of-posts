/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UserSlice {
  users: User[],
  hasError: boolean,
  loaded: boolean,
}

const initialState: UserSlice = {
  users: [],
  hasError: false,
  loaded: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingUsers(state) {
      state.loaded = false;
    },

    setUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.hasError = false;
      state.loaded = true;
    },

    setUsersFail(state) {
      state.loaded = true;
      state.hasError = true;
    },
  },
});

export const {
  loadingUsers, setUsersSuccess, setUsersFail,
} = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
