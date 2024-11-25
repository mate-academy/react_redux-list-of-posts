/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = {
  user: User | null;
};

const initialState: Author = {
  user: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<Author>) => {
      state.user = action.payload.user;
    },
  },
});

export default authorSlice.reducer;
export const { selectUser } = authorSlice.actions;
