/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';

type UserState = {
  value: User | null;
};

const initialState: UserState = {
  value: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeAuthor: () => ({
      value: null,
    }),
  },
});

export default authorSlice.reducer;
export const { setAuthor, removeAuthor } = authorSlice.actions;
