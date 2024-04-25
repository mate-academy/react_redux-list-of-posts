/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  expanded: boolean;
}

const initialState: UsersState = {
  users: [],
  expanded: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setExpanded: (state, action) => {
      state.expanded = action.payload;
    },
  },
});

export const { setUsers, setExpanded } = usersSlice.actions;
export default usersSlice.reducer;
