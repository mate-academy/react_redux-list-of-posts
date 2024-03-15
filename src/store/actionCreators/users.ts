import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const users = await getUsers();

  return users;
});
