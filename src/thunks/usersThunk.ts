import { createAsyncThunk } from '@reduxjs/toolkit';
import * as commentsApi from '../api/users';

export const usersFetch = createAsyncThunk(
  'users/fetch',
  async () => {
    const response = await commentsApi.getUsers();

    return response;
  },
);
