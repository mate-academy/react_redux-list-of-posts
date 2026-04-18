import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import * as usersApi from '../../api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return usersApi.getUsers();
  },
);

type UsersState = {
  items: User[];
};

const initialState: UsersState = {
  items: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default usersSlice.reducer;