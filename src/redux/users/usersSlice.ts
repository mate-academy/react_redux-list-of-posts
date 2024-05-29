/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './operations';
import { User } from '../../types/User';

export interface IInitialState {
  users: User[];
}

const initialState: IInitialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
