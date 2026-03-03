/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author;
export default authorSlice.reducer;
