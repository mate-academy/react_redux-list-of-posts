import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setUser } = authorSlice.actions;

export default authorSlice.reducer;
