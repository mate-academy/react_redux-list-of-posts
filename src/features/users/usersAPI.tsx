import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const setUsers = createAsyncThunk('/users/fetchUsers',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  });
