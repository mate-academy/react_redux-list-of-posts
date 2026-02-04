import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = { author: null };

export const AuthorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => ({
      ...state,
      author: action.payload,
    }),
  },
});

export const { set } = AuthorSlice.actions;
export default AuthorSlice.reducer;
