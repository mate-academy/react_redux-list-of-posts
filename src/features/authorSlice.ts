import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const currentAuthorSlice = createSlice({
  name: 'currentAuthor',

  initialState,

  reducers: {
    setCurrentAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setCurrentAuthor } = currentAuthorSlice.actions;
export default currentAuthorSlice.reducer;
