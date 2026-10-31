import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/User';

export interface AuthorState {
  value: User | null;
}

const initialState: AuthorState = {
  value: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
