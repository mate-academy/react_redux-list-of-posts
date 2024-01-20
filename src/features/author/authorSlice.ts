/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  value: User | null,
};

const initialState: AuthorState = {
  value: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const authorActions = authorSlice.actions;

export const authorReducer = authorSlice.reducer;
