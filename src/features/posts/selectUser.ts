/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface SelectedAuthor {
  author: User | null;
}

const initialState: SelectedAuthor = { author: null };

export const { reducer, actions } = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});
