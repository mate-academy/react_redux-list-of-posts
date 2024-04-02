import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type StateAuthor = { author: User | null };

const initialState: StateAuthor = { author: null };

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => ({
      ...state,
      author: action.payload,
    }),
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
