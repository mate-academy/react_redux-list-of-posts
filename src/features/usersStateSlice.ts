import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface State {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsersAction = createAsyncThunk<User[]>(
  'usersState/fetchUsers',
  getUsers,
);

const usersStateSlice = createSlice({
  name: 'usersState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export default usersStateSlice.reducer;
