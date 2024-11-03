import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    changeAuthor: (_state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
