import { createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from '../../api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetch', () => {
    return usersApi.getUsers();
  },
);
