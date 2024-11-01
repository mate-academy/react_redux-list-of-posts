/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/User';

const initialState = {
  author: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { selectUser } = authorSlice.actions;
