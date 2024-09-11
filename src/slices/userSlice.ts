/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser, getUsers } from '../api/users';

type StateProps = {
  users: User[];
};

const initialState: StateProps = {
  users: [],
};

export const fetchUsers = createAsyncThunk<User[], void>(
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

export const fetchUsersById = createAsyncThunk<User[], number>(
  'users/fetchUserById',
  async (id: number) => {
    try {
      const response = await getUser(id);

      return response;
    } catch (error) {
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
