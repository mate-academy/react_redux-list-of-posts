import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../api/users';

export const loadUser = createAsyncThunk(
  'author/fetch',
  async (userId: number) => {
    return getUser(userId);
  },
);
