import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const getAllUsers = createAsyncThunk('users/getAll', getUsers);
