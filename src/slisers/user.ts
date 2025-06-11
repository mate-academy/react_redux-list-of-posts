import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action) => action.payload,
  },
});

export default user.reducer;
export const { setUser } = user.actions;
