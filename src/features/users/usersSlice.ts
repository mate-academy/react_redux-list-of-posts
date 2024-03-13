/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from '../../utils/thunks/fetchUsers';

export interface UsersState {
  value: User[];
}

const initialState: UsersState = {
  value: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default usersSlice.reducer;
