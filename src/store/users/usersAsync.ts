import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/Fetch users', async () => {
  return getUsers();
});
