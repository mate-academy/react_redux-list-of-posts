import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const getUsersAction = createAsyncThunk('users/fetch', getUsers);
