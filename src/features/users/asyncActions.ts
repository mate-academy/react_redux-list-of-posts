import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});
