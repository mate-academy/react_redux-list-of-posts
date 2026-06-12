import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as AuthorState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<AuthorState>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
