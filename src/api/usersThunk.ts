import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from './users';

export const usersThunk = createAsyncThunk('users/fetch', getUsers);
