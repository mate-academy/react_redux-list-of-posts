import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
