import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });
    builder.addCase(fetchUsers.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default userSlice.reducer;
