import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null as AuthorState;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
