import { createSelector, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action) => action.payload,
  },
});

export default authorSlice.reducer;

const author = (state: RootState) => state.author;

export const authorSelector = createSelector([author], value => value);

export const { set } = authorSlice.actions;
