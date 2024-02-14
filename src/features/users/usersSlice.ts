/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface UsersState {
  users: User[],
  expanded: boolean,
}

const initialState: UsersState = {
  users: [],
  expanded: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.expanded = action.payload;
    },
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { set, setExpanded } = usersSlice.actions;
