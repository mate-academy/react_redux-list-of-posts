/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.items = action.payload;
      state.loaded = true;
    },
    setUsersLoading(state) {
      state.loaded = false;
      state.hasError = false;
    },
    setUsersError(state) {
      state.hasError = true;
      state.loaded = false;
    },
  },
});

export const { setUsers, setUsersLoading, setUsersError } = usersSlice.actions;

export default usersSlice.reducer;
