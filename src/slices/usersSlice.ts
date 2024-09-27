/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type StateProps = {
  users: User[] | null;
};

const initialState: StateProps = {
  users: [],
};

export const fetchAllUsers = createAsyncThunk<User[], void>(
  'users/fetchAllUsers',
  async () => {
    try {
      const result = await getUsers();

      return result;
    } catch (error) {
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
