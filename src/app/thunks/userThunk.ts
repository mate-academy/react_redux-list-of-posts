import { createAsyncThunk } from '@reduxjs/toolkit';
import * as usersAPI from '../../api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetch', () => {
    return usersAPI.getUsers();
  },
);
