import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

//type UsersState = User[] | [];

//const initialState: UsersState = [];

export const fetchUsersAction = createAsyncThunk<User[]>(
  'usersState/fetchUsers',
  getUsers,
);
