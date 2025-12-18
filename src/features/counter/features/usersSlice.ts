/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

export interface SetUserInterface {
  items: User[];
}

const initialState: SetUserInterface = {
  items: [],
};

export const getUsersAsync = createAsyncThunk(
  'users/getUsersAsync',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default userSlice.reducer;
