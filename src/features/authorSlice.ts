import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/User';

// Зберігаємо ID або null, якщо автор не обраний
const initialState = null as User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
