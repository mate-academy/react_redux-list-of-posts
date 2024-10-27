import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type InitialState = {
  users: User[];
};

const initialState: InitialState = {
  users: [],
};

export const allUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(
      allUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.users = action.payload;
      },
    );
  },
});

export const usersReducer = usersSlice.reducer;
