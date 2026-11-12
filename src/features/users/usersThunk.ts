import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export default loadUsers;
