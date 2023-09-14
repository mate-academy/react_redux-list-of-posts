/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = { author: User | null };

const initialState: State = { author: null };

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },

  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
