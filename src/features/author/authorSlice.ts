import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const authorSlice = createSlice({
  name: 'autрor',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export default authorSlice.reducer;
export const { setAuthor, clearAuthor } = authorSlice.actions;
