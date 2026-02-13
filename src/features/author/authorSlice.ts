import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    clearAuthor: () => null,
    setAuthor: (state, action: PayloadAction<User>) => action.payload,
  },
});

export const { clearAuthor, setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
