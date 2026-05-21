import { User } from '../../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
    clearAuthor: () => {
      return null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
