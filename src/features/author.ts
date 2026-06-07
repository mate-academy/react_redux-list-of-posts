import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },

    clearAuthor: () => {
      return null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;
