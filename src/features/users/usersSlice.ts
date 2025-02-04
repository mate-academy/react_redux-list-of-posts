/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface CounterUsersState {
  users: User[];
  selectedUser: User | null;
}

const initialValue: CounterUsersState = {
  users: [],
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialValue,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );

    builder.addCase(fetchUsers.pending, state => {
      state.users = [];
    });
  },
});

export const { setUsers, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
