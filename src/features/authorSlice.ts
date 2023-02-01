import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = User | null;

const initialState = null as State;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<State>) => action.payload,
  },
});

export default authorSlice.reducer;

export const { set } = authorSlice.actions;
