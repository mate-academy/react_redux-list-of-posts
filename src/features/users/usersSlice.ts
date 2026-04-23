import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

const initialState: User[] = [];

export const init = createAsyncThunk('users/fetch', () => getUsers(), {
  condition: (_, { getState }) => {
    const { users } = getState() as RootState;

    return users.length === 0;
  },
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_, action) => action.payload);
  },
});

export const { setUsers } = userSlice.actions;
