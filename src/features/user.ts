import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clear: state => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { select, clear } = userSlice.actions;
