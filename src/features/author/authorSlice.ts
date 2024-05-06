import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type Author = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as Author,
  reducers: {
    set: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
