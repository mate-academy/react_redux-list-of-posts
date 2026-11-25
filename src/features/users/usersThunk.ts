import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const initUsers = createAsyncThunk('users/init', () => getUsers());
