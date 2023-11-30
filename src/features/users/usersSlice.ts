/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: { users: User[] } = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
