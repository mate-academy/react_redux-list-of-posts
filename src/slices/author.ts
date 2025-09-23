import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor(_state, { payload }: PayloadAction<User>) {
      return payload;
    },
  },
});

export default authorSlice.reducer;
export const AuthorActions = {
  ...authorSlice.actions,
};
