import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

type UsersState = {
  items: User[];
};

const initialState: UsersState = {
  items: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const usersReducer = usersSlice.reducer;
