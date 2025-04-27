import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null as AuthorState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
