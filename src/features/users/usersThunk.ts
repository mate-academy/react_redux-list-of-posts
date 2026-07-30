import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUsers } from '../../api/users';

import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',

  async () => {
    const users = await getUsers();

    return users;
  },
);
