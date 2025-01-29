import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const userSelectSlice = createSlice({
  name: 'users',
  initialState: {} as User,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSelectSlice.actions;
export default userSelectSlice.reducer;
