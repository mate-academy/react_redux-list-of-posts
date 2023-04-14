import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type Props = { items: User[] };

const initialState: Props = { items: [] };

export const loadApiUsers = createAsyncThunk('users/load', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loadApiUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    });
  },
});

export default usersSlice.reducer;
