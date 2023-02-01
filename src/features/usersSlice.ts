import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = User[];

const initialState: State = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<State>) => {
      state.push(...action.payload);
    },
  },
});

export default usersSlice.reducer;

export const { set } = usersSlice.actions;
