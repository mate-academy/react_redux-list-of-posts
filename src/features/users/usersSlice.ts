import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

type UserState = {
  selected: User | null;
};

const initialState: UserState = {
  selected: null,
};

export const currUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, selected: action.payload };
    },
  },
});

export const selectUser = (state: RootState) => state.currentUser.selected;

export const { setUser } = currUserSlice.actions;
