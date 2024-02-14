import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as null | User,
  reducers: {
    setAuthor: (_author, action: PayloadAction<User | null>) => action.payload,
  },
});

export const authorReducer = authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
