import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: { value: null as User | null },
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      value: action.payload,
    }),
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
