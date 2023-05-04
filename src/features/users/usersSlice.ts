/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'failed',
  users: User[],
  selectedUser: User | null,
};
const initialState: InitialStateType = {
  status: 'idle',
  users: [],
  selectedUser: null,
};

export const loadUserAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const data = await getUsers();

    return data;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(loadUserAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export const setUsers = (state: RootState) => state.users.users;
export const selectedUser = (state: RootState) => state.users.selectedUser;

export default usersSlice.reducer;
