import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const fetchUser = createAsyncThunk('users/fetch', getUsers);
