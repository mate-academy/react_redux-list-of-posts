/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface InitialState {
  users: User[] | [];
}

const initialState: InitialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
