/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type StateProps = {
  users: User[] | null;
};

const initialState: StateProps = {
  users: [],
};

export const fetchAllUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async () => {
    try {
      const response = await getUsers();

      return response;
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

export const {} = userSlice.actions;
export default userSlice.reducer;
