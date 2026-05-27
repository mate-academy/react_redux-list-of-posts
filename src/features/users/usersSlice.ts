import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', () =>
  getUsers(),
);

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(fetchUsers.rejected, state => ({
        ...state,
        items: [],
        loaded: true,
        hasError: true,
      }));
  },
});

export default usersSlice.reducer;
