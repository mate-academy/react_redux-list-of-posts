import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
const slice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setAuthor } = slice.actions;
export default slice.reducer;
