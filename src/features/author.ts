import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null as AuthorState;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => action.payload,
  },
});

export default authorSlice.reducer;
