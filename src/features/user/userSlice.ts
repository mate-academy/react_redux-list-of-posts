import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[],
  isLoading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk(
  'users/getUsers', () => {
    return getUsers();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
