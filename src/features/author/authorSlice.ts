import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { User } from '../../types/User';

const initialState = {
  value: null as User | null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
