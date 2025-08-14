/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

const initialState = {
  selectedAuthor: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.selectedAuthor = action.payload;
    },
    clearAuthor: state => {
      state.selectedAuthor = null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.selectedAuthor;

export default authorSlice.reducer;
