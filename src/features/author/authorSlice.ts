/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
