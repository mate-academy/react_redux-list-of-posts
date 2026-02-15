/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UserState {
  users: User[];
  selected: User | null;
}

const initialState: UserState = {
  users: [],
  selected: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelected: (state, action: PayloadAction<User | null>) => {
      state.selected = action.payload;
    },
  },
});

export const { setUsers, setSelected } = userSlice.actions;

export default userSlice.reducer;
