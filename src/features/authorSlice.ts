import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({
      ...state,
      author: action.payload,
    }),
  },
});

export const { setUser } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
