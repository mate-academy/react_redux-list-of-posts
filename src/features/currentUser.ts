import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialUser = {
  currentUser: User | null;
};

const initialState: InitialUser = {
  currentUser: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
