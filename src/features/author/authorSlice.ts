import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = User | null;

const initialState: Author = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as Author,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
