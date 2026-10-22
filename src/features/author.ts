import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_state, action) => action.payload,
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
