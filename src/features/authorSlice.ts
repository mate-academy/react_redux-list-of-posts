import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
