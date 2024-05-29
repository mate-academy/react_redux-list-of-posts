/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface IInitialValue {
  author: null | User;
}

const initialState: IInitialValue = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;

export const { setAuthor } = authorSlice.actions;
