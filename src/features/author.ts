/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = {
  value: User | null;
};

const initialState: State = {
  value: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<User>) => {
      state.value = payload;
    },
  },
});

export default authorSlice.reducer;
export const actions = authorSlice.actions;
