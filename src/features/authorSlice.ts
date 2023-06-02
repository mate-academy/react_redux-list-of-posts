import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

type InitialState = User | null;

const initialAuthor: InitialState = null as InitialState;

const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthor,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
export const authorFromReducer = (state: RootState) => state.author;
