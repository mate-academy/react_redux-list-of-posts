/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  list: User[];
  selected: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  list: [],
  selected: null,
  status: 'idle',
};

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchAll',
  async () => {
    const users = await getUsers();

    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selected = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state: { users: UsersState }) => state.users.list;
export const selectUsersStatus = (state: { users: UsersState }) => {
  return state.users.status;
};

export const selectSelectedUser = (state: { users: UsersState }) =>
  state.users.selected;

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
