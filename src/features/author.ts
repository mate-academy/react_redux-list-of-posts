import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    set: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { actions } = authorSlice;
export default authorSlice.reducer;
