import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UserState {
  users: User[],
}

const initialState: UserState = {
  users: [],
};

export const usersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
