import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

export const userSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action) => action.payload,
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
