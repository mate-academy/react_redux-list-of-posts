import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetch', async () => {
    return await getUsers();
  });

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    })
  }
});

export default usersSlice.reducer;
