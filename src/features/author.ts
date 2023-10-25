import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorState,
  reducers: {
    setAuthor: (_, action) => action.payload,
    removeAuthor: () => null,
  },
});

export default authorSlice.reducer;
export const { setAuthor, removeAuthor } = authorSlice.actions;
