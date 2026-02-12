import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: { user: User | null } = {
  user: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, { payload }: PayloadAction<User>) => {
      return { ...state, user: payload };
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
