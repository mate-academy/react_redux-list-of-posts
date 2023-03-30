import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = User | null;

const initialState: Author = null;

const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as Author,
  reducers: {
    selectAuthor: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { selectAuthor } = authorSlice.actions;
export default authorSlice.reducer;
