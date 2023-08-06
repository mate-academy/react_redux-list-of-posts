import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type Author = User | null;

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: null as Author | null,
  reducers: {
    setAuthor: (_, action: PayloadAction<Author>) => {
      return action.payload;
    },
  },
});

export default authorsSlice.reducer;
export const { setAuthor } = authorsSlice.actions;
