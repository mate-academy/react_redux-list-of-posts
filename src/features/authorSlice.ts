import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState = null as AuthorState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
