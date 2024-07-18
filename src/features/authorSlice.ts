import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  value: User | null;
};

const authorState: AuthorState = { value: null };

const authorSlice = createSlice({
  name: 'author',
  initialState: authorState,
  reducers: {
    setAuthor: (state, action) => ({ ...state, value: action.payload }),
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
