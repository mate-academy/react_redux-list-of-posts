/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

const initialState: User | null = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action) => action.payload,
  },
});

export const selectAuthor = (state: RootState) => state.author;

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
