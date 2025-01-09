import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    clear: () => null,
  },
});

export default authorSlice.reducer;

export const { set, clear } = authorSlice.actions;
