import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: User[] = [];

export const loadUsers = createAsyncThunk(
  'users/fetch',

  async () => {
    const data = await getUsers();

    return data as User[];
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state, action: PayloadAction<User[]>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (_state, action) => action.payload);
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
