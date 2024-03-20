import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { SliceType } from '../types/SliceType';

const initialState: { author: User | null } = { author: null };

const authorSlice = createSlice({
  name: SliceType.Author,
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
