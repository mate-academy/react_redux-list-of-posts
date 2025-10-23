import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const loadUsers = createAsyncThunk('/users', getUsers)

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export default usersSlice.reducer;
