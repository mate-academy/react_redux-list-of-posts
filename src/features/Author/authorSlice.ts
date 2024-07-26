/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface CounterState {
  value: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: null,
  status: 'idle',
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
  extraReducers: {},
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
