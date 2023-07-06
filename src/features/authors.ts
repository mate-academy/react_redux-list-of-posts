/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = User | null;

const autorsSlice = createSlice({
  name: 'authors',
  initialState: null as State,
  reducers: {
    set: (state, action: PayloadAction<State>) => {
      state = action.payload;

      return state;
    },
  },
});

export default autorsSlice.reducer;
export const { actions } = autorsSlice;
