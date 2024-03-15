/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from '../actionCreators/users';

interface UsersSliceState {
  users: User[] | null;
  isLoading: boolean;
  error: string;
}

const initialState: UsersSliceState = {
  users: null,
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = '';
        state.users = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.users = null;
      });
  },
});

export default usersSlice.reducer;
