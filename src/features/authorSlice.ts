import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState = null as AuthorState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<User>) => action.payload,
    clear: () => null,
  },
});

const { actions, reducer } = authorSlice;

export default reducer;
export const authorActions = actions;
