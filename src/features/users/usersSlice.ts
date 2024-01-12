/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface IInitialState {
  users: User[]
}

const initialState: IInitialState = {
  users: [],
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
