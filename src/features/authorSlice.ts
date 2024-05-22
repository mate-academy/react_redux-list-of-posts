/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  author: User | null;
};

const initialState: UsersState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
