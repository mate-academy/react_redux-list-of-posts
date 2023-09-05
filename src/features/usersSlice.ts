/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  selectedUser: User | null,
  loading: boolean,
  hasError: boolean,
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    clear: (state) => {
      state.users = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.hasError = false;
        state.users = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.hasError = false;
        state.loading = false;
      });
  },
});

export const { setUser, clear } = usersSlice.actions;
export default usersSlice.reducer;
