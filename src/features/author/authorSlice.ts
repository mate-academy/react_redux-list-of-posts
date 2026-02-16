/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';
type State = {
  author: User | null;
};

const initialState: State = {
  author: null,
};
const authotSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.author;
export const { set } = authotSlice.actions;

export default authotSlice.reducer;
