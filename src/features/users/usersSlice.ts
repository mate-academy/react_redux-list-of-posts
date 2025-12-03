import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from './userAPI';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', fetchUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsersThunk.fulfilled,
      (state: UserState, action: PayloadAction<User[]>) => {
        return {
          ...state,
          users: action.payload,
        };
      },
    );
  },
});

export const usersReducer = usersSlice.reducer;
