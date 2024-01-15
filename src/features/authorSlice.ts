/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface State {
  author: User | null,
}

const initialState: State = {
  author: null,
};

const author = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { set } = author.actions;
export default author.reducer;
