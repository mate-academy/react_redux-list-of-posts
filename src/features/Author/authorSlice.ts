/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface CounterState {
  value: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: null,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthor } = counterSlice.actions;

export const selectCount = (state: RootState) => state.author;

export default counterSlice.reducer;
