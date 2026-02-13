import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = { author: User | null };

const initialState: AuthorState = { author: null };

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
