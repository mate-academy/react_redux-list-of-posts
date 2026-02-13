import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface UserState {
  items: User[];
}

const initialState: UserState = {
  items: [] as User[],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    });
  },
});

export const usersReducer = usersSlice.reducer;
export type { UserState };
