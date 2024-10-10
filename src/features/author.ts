import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setUser: (user, { payload }: PayloadAction<User | null>) => payload,
  },
});

export const { setUser } = authorSlice.actions;
export default authorSlice.reducer;
