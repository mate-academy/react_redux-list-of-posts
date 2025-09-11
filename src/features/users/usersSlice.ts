/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

type State = {
  users: User[];
};

const initialState: State = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = getUsers();

  return data;
});
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export default userSlice.reducer;
