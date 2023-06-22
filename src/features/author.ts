/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface UsersState {
  author: User | null;
}

const initialState: UsersState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectedUser: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    unselectUser: (state) => {
      state.author = null;
    },
  },
});

export const { selectedUser } = authorSlice.actions;
export default authorSlice.reducer;
