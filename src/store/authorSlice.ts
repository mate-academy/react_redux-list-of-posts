import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from './index';

type AuthorState = {
  current: User | null;
};

const initialState: AuthorState = {
  current: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      current: action.payload,
    }),
  },
});

export const { setAuthor } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;

export const selectAuthor = (state: RootState) => state.author.current;
