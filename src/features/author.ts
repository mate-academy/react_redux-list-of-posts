import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
