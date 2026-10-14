import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_author, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export default authorSlice.reducer;
