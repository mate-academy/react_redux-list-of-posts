/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  value: User | null;
};

const initialState: AuthorState = { value: null };

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state: AuthorState, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
