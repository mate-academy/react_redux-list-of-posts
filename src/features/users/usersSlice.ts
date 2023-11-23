/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[],
  loading: boolean,
  hasError: boolean,
  selectedUser: User | null,
}

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: false,
  selectedUser: null,
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const res = await getUsers();

    return res;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.hasError = true;
      state.loading = false;
    });
  },
});

export const { setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
