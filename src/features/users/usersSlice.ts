import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users'; 

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
