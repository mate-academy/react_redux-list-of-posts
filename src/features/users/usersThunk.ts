import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const usersThunk = createAsyncThunk('users/fetch', getUsers);
