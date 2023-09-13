/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = {
  selectedUser: null as User | null,
};

const selectedPostSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    chooseUser: (selectedUser, action: PayloadAction<User>) => {
      selectedUser.selectedUser = action.payload;
    },
    removeUser: selectedUser => {
      selectedUser.selectedUser = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
