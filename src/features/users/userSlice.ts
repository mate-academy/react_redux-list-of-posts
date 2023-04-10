/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
};

export const loadUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const loadedUsers = await getUsers();

    // eslint-disable-next-line no-console
    console.log(loadedUsers);

    return loadedUsers;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(loadUsersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users.value;
