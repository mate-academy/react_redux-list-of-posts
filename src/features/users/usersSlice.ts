/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { LoadingStatus } from '../../types/LoadingStatus';

type State = {
  users: User[];
  selectedUser: User | null;
  status: LoadingStatus;
};

const initialState: State = {
  users: [],
  selectedUser: null,
  status: LoadingStatus.Idle,
};

export const getUsersAsync = createAsyncThunk(
  'users/getUsersAsync',
  async () => {
    const users = getUsers();

    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, state => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = LoadingStatus.Idle;
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, state => {
        state.status = LoadingStatus.Failed;
      });
  },
});

export const { selectUser } = usersSlice.actions;

export default usersSlice.reducer;
