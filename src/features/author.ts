/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: { author: null } as { author: null | User },
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.author = action.payload;
    },
    deleteUser(state) {
      state.author = null;
    },
  },
});

const { reducer, actions } = authorSlice;

export const userReducer = reducer;
export const userActions = actions;

export default authorSlice;
