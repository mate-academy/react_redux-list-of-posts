import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => {
      return action.payload as typeof state;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
