import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export type UsersState = User[];

const initialState: UsersState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>
  getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsers.fulfilled,
      (_, action: PayloadAction<UsersState>) => action.payload,
    );
  },
});

export default usersSlice.reducer;
