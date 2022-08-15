/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import type { RootState } from '../../app/store';
import Status from '../../enums/Status';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  status: `${Status}`;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  status: Status.Idle,
};

export const fetchUsers = createAsyncThunk(
  'userSelector/fetchUsers',
  async () => {
    const response = await getUsers();

    return response;
  },
);

export const userSelectorSlice = createSlice({
  name: 'userSelector',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = Status.Idle;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const { selectUser } = userSelectorSlice.actions;

export const usersSelector = (state: RootState) => (
  state.users
);

export default userSelectorSlice.reducer;
