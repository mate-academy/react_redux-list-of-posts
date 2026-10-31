import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import type { User } from '../../types/User';

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);

export interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

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

export default usersSlice.reducer;
