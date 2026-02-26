import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

/* eslint-disable no-param-reassign */

const initialState = {
  currentUser: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authorSlice.actions;
export default authorSlice.reducer;
