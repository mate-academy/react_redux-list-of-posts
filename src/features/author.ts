import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as (null | User);

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
