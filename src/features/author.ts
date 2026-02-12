import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setCurrentUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentUser } = authorSlice.actions;

export default authorSlice.reducer;
