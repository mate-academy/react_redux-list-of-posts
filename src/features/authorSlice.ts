import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  value: User | null;
};

const initialState: AuthorState = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    clear: state => {
      return {
        ...state,
        value: null,
      };
    },
  },
});
