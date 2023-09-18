import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface UsersState {
  users: User[],
  loading: boolean,
  error: string,
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk(
  'users/GET_USERS',
  () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          users: [...action.payload],
          loading: false,
        };
      })
      .addCase(fetchUsers.rejected, (state) => {
        return {
          ...state,
          loading: false,
          error: 'Something went wrong',
        };
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
