/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null,
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
