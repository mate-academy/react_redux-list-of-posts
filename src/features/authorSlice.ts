import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = User | null;

const initialAuthor: InitialState = null as InitialState;

const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthor,
  reducers: {
    set: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
