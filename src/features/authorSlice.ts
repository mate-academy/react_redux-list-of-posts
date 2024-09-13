import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

// type AuthorSlice = {
//   author: User | null;
// };

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const authorReducer = authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
