import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';

type State = User | null;

const initialState = null as State;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
