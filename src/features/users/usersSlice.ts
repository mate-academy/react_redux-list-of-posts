import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const usersAsync = createAsyncThunk('users/fetchAll', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(usersAsync.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
