import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type Author = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as Author,
  reducers: {
    set: (_, action: PayloadAction<User>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
