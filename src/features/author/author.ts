import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = null | User;

const initialState: Author = null as Author;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(_state, action: PayloadAction<User | null>) {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
