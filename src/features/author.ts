/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = {
  author: User | null
};

const initialState: State = {
  author: null,
};

const author = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default author.reducer;
export const { setUser } = author.actions;
